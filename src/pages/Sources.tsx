import { Box, Button, IconButton, Typography } from "@mui/material";
import StyledDataGrid from "../components/StyledDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Add, Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import ActionMenu from "../components/ActionMenu";

const Sources = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "url", headerName: "URL", flex: 1 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "method", headerName: "Method", width: 130 },
    { field: "body", headerName: "Body", flex: 1 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      align: "right",
      renderCell: () => (
        <ActionMenu
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
  ];
  const rows = [
    {
      id: 1,
      url: "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      type: "browser",
      method: "GET",
      paging_field: "page",
      body: '{"BrandID":3650,"orderby":"Ranking","sortDir":"DESC","pageSize":18,"CategoryID":-1,"CurrentPage":1,"CollectionIDs":"","AdditionalFilter":[]}',
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Sources</Typography>
        <Button variant="contained" disableElevation startIcon={<Add />}>
          Create
        </Button>
      </Box>
      <StyledDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={rows}
        rowHeight={64}
      ></StyledDataGrid>
    </>
  );
};

export default Sources;
