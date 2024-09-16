import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";

const RootStyle = styled(AppBar)(() => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: "white",
  borderBottom: "solid 1px #eee",
  position: "static",
}));

const ToolbarStyle = styled(Toolbar)(() => ({
  minHeight: 64,
}));

interface NavProps {
  onOpenSidebar: () => void;
}
const Navbar: FC<NavProps> = ({ onOpenSidebar }) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton sx={{ color: "text.primary" }} onClick={onOpenSidebar}>
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}></Box>
        <IconButton>
          <Avatar src="https://minimal-kit-react.vercel.app/static/mock-images/avatars/avatar_default.jpg"></Avatar>
        </IconButton>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
