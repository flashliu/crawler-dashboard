import { GridColDef } from "@mui/x-data-grid";
import StyledDataGrid from "../components/StyledDataGrid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Add, Delete, MoreVert, Stop, Visibility } from "@mui/icons-material";
import Bridge from "../components/Bridge";
import ActionMenu from "../components/ActionMenu";

const Tasks = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "startTime", headerName: "Start Time", width: 200 },
    { field: "listing_count", headerName: "Listing count", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Bridge type={params.row.status}>{params.row.status}</Bridge>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
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
              name: "Stop",
              icon: <Stop fontSize="small" />,
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
      source:
        "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      status: "pending",
      listing_count: 188,
      startTime: "2024-01-01 21:24:00",
    },
    {
      id: 2,
      source:
        "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      status: "success",
      listing_count: 90,
      startTime: "2024-01-01 21:24:00",
    },
    {
      id: 3,
      source:
        "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      status: "running",
      listing_count: 68,
      startTime: "2024-01-01 21:24:00",
    },
    {
      id: 4,
      source:
        "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      status: "pending",
      listing_count: 52,
      startTime: "2024-01-01 21:24:00",
    },
    {
      id: 5,
      source:
        "https://www.prestonsdiamonds.co.uk/rolex-certified-pre-owned/watches",
      status: "failed",
      listing_count: 78,
      startTime: "2024-01-01 21:24:00",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Tasks</Typography>
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

export default Tasks;
