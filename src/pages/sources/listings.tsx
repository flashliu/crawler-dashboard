import { Box, IconButton, Typography } from "@mui/material";
import StyledDataGrid from "../../components/StyledDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { MoreVert, Visibility } from "@mui/icons-material";
import ActionMenu from "../../components/ActionMenu";

import { getListings, Listing } from "../../api/crawler";
import { useMemo, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useParams } from "react-router-dom";

const Listings = () => {
  const [rows, setRows] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [count, setCount] = useState(0);

  const sourceId = useParams().source_id;

  useUpdateEffect(() => {
    // TODO: fetch data
    if (sourceId) {
      getData(sourceId, page, pageSize);
    }
  }, [page, pageSize, sourceId]);

  const getData = (id: string | number, p: number, ps: number) => {
    getListings(id, p, ps).then(({ data }) => {
      setRows(data.list);
      setCount(data.count);
    });
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 50 },
      { field: "title", headerName: "Title", flex: 1 },
      { field: "post_id", headerName: "Post Id", width: 130 },
      { field: "brand", headerName: "Brand", width: 130 },
      { field: "collection", headerName: "Collection", width: 130 },
      { field: "reference", headerName: "Reference", width: 130 },
      { field: "year", headerName: "Year", width: 130 },
      // { field: "description", headerName: "Description", flex: 1 },
      {
        field: "is_processed",
        headerName: "Is Processed",
        width: 130,
        type: "boolean",
      },
      // { field: "url", headerName: "Url", width: 130 },
      // { field: "price", headerName: "Price", width: 130 },
      {
        field: "price_in_usd",
        headerName: "Price In Usd",
        width: 130,
        renderCell: (params) => {
          if (!params.row.latest_price) return <>-</>;
          return params.row.latest_price.price_in_usd;
        },
      },

      {
        field: "last_updated",
        headerName: "Last Updated",
        width: 230,
        renderCell: (params) => {
          if (!params.row.latest_price) return <>-</>;
          return new Date(
            params.row.latest_price.category_page.start_time
          ).toLocaleString();
        },
      },

      {
        field: "actions",
        headerName: "",
        sortable: false,
        disableColumnMenu: true,
        align: "right",
        renderCell: () => (
          <ActionMenu
            onClick={(action) => {
              console.log(action);
            }}
            actions={[
              {
                name: "View Prices",
                icon: <Visibility fontSize="small" />,
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
        <Typography variant="h5">Listings</Typography>
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
        pageSizeOptions={[25, 50, 100]}
        pagination
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        rowCount={count}
      ></StyledDataGrid>
    </>
  );
};

export default Listings;
