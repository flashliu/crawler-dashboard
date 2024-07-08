import {
  ListItemIcon,
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
  Grow,
  Popper,
  ListItemText,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

interface Action {
  name: string;
  icon: ReactNode;
  color?: string;
}

interface ActionMenuProps {
  actions: Action[];
  children: ReactNode;
}

const ActionMenu: FC<ActionMenuProps> = ({ actions, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role="tooltip"
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
              <Paper>
                <MenuList>
                  {actions.map((action) => (
                    <MenuItem key={action.name} onClick={handleClose}>
                      <ListItemIcon sx={{ color: action.color, minWidth: 32 }}>
                        {action.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={action.name}
                        primaryTypographyProps={{
                          fontSize: 14,
                          color: action.color,
                        }}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ActionMenu;
