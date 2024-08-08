import { FC } from "react";
import { Box, Drawer, List, styled, Typography } from "@mui/material";
import NavItem from "./NavItem";
import { Assignment, Source } from "@mui/icons-material";

const RootStyle = styled(Drawer)({
  "& .logo": {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 18,
  },
});

const LogoStyle = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "30px 10px",
});

interface SidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}
const Sidebar: FC<SidebarProps> = ({ isOpenSidebar, onCloseSidebar }) => {
  return (
    <RootStyle
      open={isOpenSidebar}
      onClose={onCloseSidebar}
      PaperProps={{
        sx: { width: 280, boxShadow: "none" },
      }}
    >
      <LogoStyle>
        <img
          className="logo"
          src="https://cdn.watchcharts.com/logo/watchcharts/android-chrome-192x192.png"
          alt="logo"
        />
        <Typography variant="h5">
          <span>Watch</span>
          <Box component="span" sx={{ color: "#1db954", fontWeight: 600 }}>
            Charts
          </Box>
        </Typography>
      </LogoStyle>
      <List disablePadding sx={{ p: 1 }}>
        <NavItem
          title="Sources"
          path="/sources"
          icon={<Source />}
          onClick={() => onCloseSidebar()}
        ></NavItem>
        <NavItem
          title="Tasks"
          path="/tasks"
          icon={<Assignment></Assignment>}
          onClick={() => onCloseSidebar()}
        ></NavItem>
      </List>
    </RootStyle>
  );
};

export default Sidebar;
