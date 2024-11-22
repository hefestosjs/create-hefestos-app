import fs from "node:fs";
import path from "node:path";
import { executeCommand } from "../utils/index";

export function updateMongoSchema(projectName) {
  try {
    const schemaPath = path.join(
      projectName,
      "app",
      "database",
      "schema.prisma"
    );

    let schemaContent = fs.readFileSync(schemaPath, "utf-8");

    const idFieldRegex = /id\s+String\s+@id\s+@default\(uuid\(\)\)/gs;
    const updatedId = 'id String @id @default(uuid()) @map("_id")';
    schemaContent = schemaContent.replace(idFieldRegex, updatedId);

    fs.writeFileSync(schemaPath, schemaContent, "utf-8");
    executeCommand(`cd ${projectName} && bunx prisma format`);
  } catch (error) {
    console.error("Error updating the schema.prisma file:", error);
  }
}
