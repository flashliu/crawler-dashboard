import { Container, styled } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainStyle = styled(Container)({
  paddingTop: 88,
  height: "100vh",
});

const BaseLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar onOpenSidebar={() => setOpen(true)}></Navbar>
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      ></Sidebar>
      <MainStyle maxWidth={false}>
        <Outlet></Outlet>
      </MainStyle>
    </>
  );
};
export default BaseLayout;