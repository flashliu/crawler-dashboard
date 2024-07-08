import "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    customShadow: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadow?: string;
  }
}
