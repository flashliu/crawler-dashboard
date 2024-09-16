import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import StyledDataGrid from "../../components/StyledDataGrid";
import { GridColDef, useGridApiRef } from "@mui/x-data-grid";
import {
  Add,
  Delete,
  Edit,
  MoreVert,
  PlayCircle,
  Visibility,
} from "@mui/icons-material";
import ActionMenu from "../../components/ActionMenu";

import {
  getSources,
  Source,
  sourceDelete,
  sourceScrap,
  sourceScrapMulti,
} from "../../api/crawler";
import { useEffect, useMemo, useRef, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import EditSource, { EditSourceHandle } from "./components/EditSource";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Bridge from "../../components/Bridge";

const colors: Record<string, string> = {
  running: "#1db954",
  pending: "#1db954",
  complete: "green",
  fail: "#ff6b6b",
};

const Index = () => {
  let navigate = useNavigate();

  const EditSourceRef = useRef<EditSourceHandle>(null);
  const apiRef = useGridApiRef();
  const timer = useRef<any>();
  const [rows, setRows] = useState<Source[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(() => {
      getData(page, pageSize);
    }, 5000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  useUpdateEffect(() => {
    // TODO: fetch data
    getData(page, pageSize);
  }, [page, pageSize]);

  const getData = (p: number, ps: number) => {
    getSources(p, ps).then(({ data }) => {
      setRows(data.list);
      setCount(data.count);
    });
  };

  const handleDelete = (source: Source) => {
    // TODO: delete
    if (confirm("Are you sure you want to delete this source?")) {
      sourceDelete(source.id).then(() => {
        getData(page, pageSize);
      });
    }
  };

  const handleEdit = (source: Source) => {
    EditSourceRef.current?.edit(source);
  };

  const handleScrap = (source: Source) => {
    if (source.task) {
      if (["pending", "running"].includes(source.task.status)) {
        toast.error("Task is existing");
        return;
      }
    }

    sourceScrap(source.id).then(() => {
      getData(page, pageSize);
    });
  };

  const handleScrapMulti = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    const ids: number[] = [];

    selectedRows.forEach((v) => {
      ids.push(v.id);
    });

    const selectedSources = rows.filter((source) => ids.includes(source.id));

    for (let i = 0; i < selectedSources.length; i++) {
      const source = selectedSources[i];
      if (source.task) {
        if (["pending", "running"].includes(source.task.status)) {
          toast.error(`Task for source ${source.id} is already in progress`);
          return;
        }
      }
    }

    await sourceScrapMulti(ids);
    apiRef.current.setRowSelectionModel([]);
    getData(page, pageSize);
  };

  const handleView = (source: Source) => {
    navigate(`/sources/listings/${source.id}`);
  };

  const handleCreate = () => {
    EditSourceRef.current?.add();
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 50 },
      { field: "url", headerName: "Url", flex: 1 },
      { field: "type", headerName: "Type", width: 130 },
      {
        field: "last_updated",
        headerName: "Last Updated",
        width: 230,
        renderCell: (params) => {
          if (!params.row.task) return <>-</>;
          return new Date(params.row.task.started).toLocaleString();
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          if (!params.row.task) return <>-</>;
          if (params.row.task.status === "fail") {
            return (
              <Tooltip title={params.row.task.error}>
                <Bridge type={params.row.task?.status}>
                  {params.row.task?.status}
                </Bridge>
              </Tooltip>
            );
          }
          return (
            <Bridge type={params.row.task?.status}>
              {params.row.task?.status}
            </Bridge>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        sortable: false,
        disableColumnMenu: true,
        align: "right",
        renderCell: (params) => (
          <ActionMenu
            onClick={(action) => {
              switch (action.name) {
                case "View":
                  handleView(params.row as Source);
                  break;
                case "Edit":
                  handleEdit(params.row as Source);
                  break;
                case "Scrap":
                  handleScrap(params.row as Source);
                  break;
                case "Delete":
                  handleDelete(params.row as Source);
                  break;
                default:
                  break;
              }
            }}
            actions={[
              {
                name: "View",
                icon: <Visibility fontSize="small" />,
              },
              {
                name: "Edit",
                icon: <Edit fontSize="small" />,
              },
              {
                name: "Scrap",
                icon: <PlayCircle fontSize="small" />,
              },
              {
                name: "Delete",
                icon: <Delete fontSize="small" />,
                color: "#FF5630",
              },
            ]}
          >
            <IconButton>
              <MoreVert />
            </IconButton>
          </ActionMenu>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Sources</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="info"
          disableElevation
          startIcon={<PlayCircle fontSize="small" />}
          onClick={handleScrapMulti}
        >
          Scrap
        </Button>
        <Box sx={{ width: 10 }} />
        <Button
          variant="contained"
          disableElevation
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <StyledDataGrid
        checkboxSelection
        apiRef={apiRef}
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={rows}
        rowHeight={64}
        onPaginationModelChange={(data) => {
          setPage(data.page + 1);
          setPageSize(data.pageSize);
        }}
        pageSizeOptions={[25, 50, 100]}
        pagination
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        rowCount={count}
      ></StyledDataGrid>
      <EditSource ref={EditSourceRef} onSaved={() => getData(page, pageSize)} />
    </>
  );
};

export default Index;
