import { styled } from "@mui/material";

interface BridgeProps {
  type: "success" | "failed" | "pending" | "running";
}
const backgroundColorMap = {
  success: "rgba(34,197,94,0.16)",
  failed: "rgba(255,86,48,0.16)",
  pending: "rgba(255,171,0,0.16)",
  running: "rgba(145,158,171,0.16)",
};
const textColorMap = {
  success: "#118D57",
  failed: "#B71D18",
  pending: "#B76E00",
  running: "#637381",
};
const Bridge = styled("span")<BridgeProps>(({ type }) => ({
  color: textColorMap[type],
  backgroundColor: backgroundColorMap[type],
  borderRadius: 4,
  padding: "4px 8px",
  textTransform: "capitalize",
  fontSize: 12,
  fontWeight: 600,
}));

export default Bridge;
