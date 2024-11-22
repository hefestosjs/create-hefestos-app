import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEnvFilePath = (database) => {
  const envFiles = {
    postgresql: "../envs/postgresql.txt",
    mysql: "../envs/mysql.txt",
    sqlite: "../envs/sqlite.txt",
    mongodb: "../envs/mongodb.txt",
    sqlserver: "../envs/sqlserver.txt",
    cockroachdb: "../envs/cockroachdb.txt",
  };

  return path.join(__dirname, envFiles[database] || "");
};
