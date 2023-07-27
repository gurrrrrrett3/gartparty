import Logger from "./logger";
import { spawn } from "child_process";

const args = process.argv.slice(2);

if (args.length === 0) {
  Logger.error("cli", "No arguments provided");
  process.exit(1);
}

switch (args[0]) {
  case "build":
    {
      Logger.info("cli", "Building...");

      const commands = [
        {
          pwd: "client",
          command: "npm run build",
        },
        {
          pwd: "server",
          command: "npm run build",
        },
      ];

      for (const command of commands) {
        spawn(command.command, {
          cwd: command.pwd,
          shell: true,
          stdio: "inherit",
        });
      }
    }
    break;
  case "dev": {
    Logger.info("cli", "Starting dev server...");

    const commands = [
      {
        pwd: "client",
        command: "npm run dev",
      },
      {
        pwd: "server",
        command: "npm run dev",
      },
    ];

    for (const command of commands) {
      spawn(command.command, {
        cwd: command.pwd,
        shell: true,
        stdio: "inherit",
      });
    }
  }
  break;
  case "install":
    {
        Logger.info("cli", "Installing...");

    const commands = [
      {
        pwd: "client",
        command: "npm i",
      },
      {
        pwd: "server",
        command: "npm i",
      },
    ];

    for (const command of commands) {
      spawn(command.command, {
        cwd: command.pwd,
        shell: true,
        stdio: "inherit",
      });
    }
    }
}
