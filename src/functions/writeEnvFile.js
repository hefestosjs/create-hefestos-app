import fs from "node:fs";
import path from "node:path";
import { getEnvFilePath } from "./getEnvFilePath.js";

export const writeEnvFile = (projectName, database) => {
  const envFilePath = getEnvFilePath(database);
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  const outputPath = path.join(process.cwd(), projectName, ".env");

  fs.writeFileSync(outputPath, envContent);
};
