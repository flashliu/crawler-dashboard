import { cp, setBuildInfo } from "./utils";
import dotenv from "dotenv";

dotenv.config();

const deploy = () => {
  return {
    name: "deploy",
    buildStart() {
      // console.clear();
      // clear();
    },
    buildEnd() {
      // clear();
      cp();
      setBuildInfo();
    },
  };
};

export default deploy;
