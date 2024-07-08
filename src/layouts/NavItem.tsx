import {
  alpha,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface NavItemProps {
  title: string;
  path: string;
  icon: ReactNode;
  onClick?: () => void;
}
const NavItem: FC<NavItemProps> = ({ path, icon, title, onClick }) => {
  const { pathname } = useLocation();
  const theme = useTheme();

  const active = (path: string) => {
    if (path) return !!matchPath({ path, end: false }, pathname);
    return false;
  };
  const isActiveRoot = active(path);

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      <ListItemStyle
        onClick={onClick}
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </NavLink>
  );
};

export default NavItem;