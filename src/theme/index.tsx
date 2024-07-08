import { SvgIcon, SvgIconProps, createTheme } from "@mui/material";

const customShadow = `rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px`;

const UnCheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" />
    </SvgIcon>
  );
};

const CheckedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-1.625 7.255-4.13 4.13-1.75-1.75a.881.881 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25l4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 0 0-1.24 0Z" />
    </SvgIcon>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#00AB55",
    },
    background: {
      default: "#F9FAFB",
    },
  },
  customShadow,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: customShadow,
          borderRadius: 8,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
        icon: <UnCheckIcon />,
        checkedIcon: <CheckedIcon />,
      },
    },
  },
});

export default theme;
