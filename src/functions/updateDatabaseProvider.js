import fs from "node:fs";
import path from "node:path";
import { updateMongoSchema } from "./index.js";

export function updateDatabaseProvider(projectName, newProvider) {
  try {
    const schemaPath = path.join(
      projectName,
      "app",
      "database",
      "schema.prisma"
    );

    const schemaContent = fs.readFileSync(schemaPath, "utf-8");

    const updatedSchemaContent = schemaContent.replace(
      /provider\s*=\s*".*?"/,
      `provider = "${newProvider}"`
    );

    fs.writeFileSync(schemaPath, updatedSchemaContent, "utf-8");

    if (newProvider === "mongodb") updateMongoSchema(projectName);
  } catch (error) {
    console.error("An error occurred while updating the provider:", error);
  }
}
