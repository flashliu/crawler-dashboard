import dotenv from "dotenv";
import fs from "fs";
import shell from "shelljs";
import colors from "colors";

dotenv.config();

const MOVE_PATH: string = process.env.MOVE_PATH || "";

if (!MOVE_PATH) {
  console.log(
    colors.red("Error ") +
      "please set environment variable MOVE_PATH in .env files"
  );
  process.exit();
}

export function cp(): void {
  if (!fs.existsSync(MOVE_PATH)) {
    shell.mkdir("-p", MOVE_PATH);
  }
  shell.rm("-rf", `${MOVE_PATH}/*`);
  setTimeout(() => {
    shell.cp("-R", "dist/assets/*", MOVE_PATH);
  }, 3000);
  console.log(colors.green("Success") + " cp successfully " + MOVE_PATH);
}

export function setBuildInfo(): void {
  if (!fs.existsSync(MOVE_PATH)) return;
  fs.writeFileSync(
    `${MOVE_PATH}/build-info.ini`,
    `TIME=${new Date().getTime()}`
  );
  console.log(colors.green("Success") + " set build info successfully");
}

export function clear(): void {
  if (fs.existsSync(MOVE_PATH)) {
    shell.rm("-rf", `${MOVE_PATH}`);
  }
  if (fs.existsSync("dist")) {
    shell.rm("-rf", `dist/*`);
  }
}
