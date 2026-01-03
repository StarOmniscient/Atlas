import path from "path";
import { glob } from "glob";
import { pathToFileURL } from "url";
import type { ICronOptions } from "../types/cron.js";

const runBackgroundTasks = async () => {
  const files = (await glob("background-tasks/tasks/**/*.{js,ts}")).map(
    (filepath) => path.resolve(filepath)
  );

  files.map(async (file: string) => {
    const { default: CronClass } = await import(pathToFileURL(file).href);
    const cron: ICronOptions = new CronClass();

    if (!cron.enabled) return;

    if (!cron.name) {
      console.error(`Cron: ${file.split(path.sep).pop()} does not have a name`);
      return;
    }

    if (!cron.repeatTime) {
      console.error(
        `Cron: ${file.split(path.sep).pop()} does not have a repeat time)`
      );
      return;
    }

    setInterval(() => {
      console.log(`Running cron: ${cron.name}`, cron.name);
      cron.cronExecute();
    }, cron.repeatTime);
  });
};

runBackgroundTasks();
