#!/usr/bin/env bun

import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

import {
  executeCommandList,
  updateDatabaseProvider,
  writeEnvFile,
} from "./functions/index.js";
import { clearProject } from "./utils/index.js";

try {
  const projectName = await input({ message: "Enter the project name:" });
  const database = await select({
    message: "Select the database",
    choices: [
      { name: "PostgreSQL", value: "postgresql" },
      { name: "MySQL", value: "mysql" },
      { name: "SQLite", value: "sqlite" },
      { name: "MongoDB", value: "mongodb" },
      { name: "SQL Server", value: "sqlserver" },
      { name: "CockroachDB", value: "cockroachdb" },
    ],
  });

  const commandList = [
    `git clone --depth 1 https://github.com/hefestosjs/app ${projectName}`,
    `cd ${projectName} && git init`,
    `cd ${projectName} && git branch -M main`,
    `cd ${projectName} && bun install`,
    `cd ${projectName} && bun module`,
  ];

  console.log(chalk.green("Preparing things, please, wait a moment."));

  executeCommandList(commandList);
  clearProject(projectName);
  writeEnvFile(projectName, database);
  updateDatabaseProvider(projectName, database);

  console.log("Let's code");
  console.log(`cd ${projectName}`);
} catch (error) {
  const message = chalk.red(
    "An error occurred during project setup. Please check the details below and try again."
  );

  console.error(message);
  console.error(error);
}
