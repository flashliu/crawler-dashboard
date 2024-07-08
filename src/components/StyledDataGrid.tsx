import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "--DataGrid-containerBackground": "#F4F6F8",
  border: "none",
  backgroundColor: "white",
  boxShadow: theme.customShadow,
  borderRadius: 16,
  "& .MuiDataGrid-cell": {
    borderTopStyle: "dashed",
  },
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "none !important",
    },
}));

export default StyledDataGrid;
