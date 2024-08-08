import { ThemeProvider } from "@emotion/react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Router from "./routes";
import theme from "./theme";
import "./utils/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
      <ToastContainer></ToastContainer>
    </StyledEngineProvider>
  );
}

export default App;
