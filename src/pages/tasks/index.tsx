import { Box, Typography } from "@mui/material";
import StyledDataGrid from "../../components/StyledDataGrid";
import { GridColDef } from "@mui/x-data-grid";

import { getTasks, Source } from "../../api/crawler";
import { useEffect, useMemo, useRef, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import Bridge from "../../components/Bridge";

const Index = () => {
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
    getTasks(p, ps).then(({ data }) => {
      setRows(data.list);
      setCount(data.count);
    });
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Task ID", width: 100 },
      { field: "source_id", headerName: "Source Id", width: 100 },
      { field: "insert_count", headerName: "Insert Count", width: 130 },
      { field: "update_count", headerName: "Update Count", width: 130 },
      { field: "delete_count", headerName: "Delete Count", width: 130 },
      {
        field: "started",
        headerName: "Started",
        width: 230,
        renderCell: (params) => {
          if (!params.value) return <>-</>;
          return new Date(params.value).toLocaleString();
        },
      },
      {
        field: "ended",
        headerName: "Ended",
        width: 230,
        renderCell: (params) => {
          if (!params.value) return <>-</>;
          return new Date(params.value).toLocaleString();
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          return (
            <Bridge type={params.row.status}>
              {params.row.status}
            </Bridge>
          );
        },
      },
      { field: "error", headerName: "Error", flex: 1 },
    ],
    []
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Sources</Typography>
      </Box>
      <StyledDataGrid
        // checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={rows}
        rowHeight={64}
        onPaginationModelChange={(data) => {
          setPage(data.page + 1);
          setPageSize(data.pageSize);
        }}
        pageSizeOptions={[25, 50, 100, 200]}
        pagination
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        rowCount={count}
      ></StyledDataGrid>
    </>
  );
};

export default Index;
