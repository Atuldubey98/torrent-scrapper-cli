import chalk from "chalk";
import { Command } from "commander";
import { homedir } from "os";
import path from "path";
import CreateFile from "./CreateFiles";
import Initilize from "./Intialize";
import ITorrentMovie from "./interfaces/ITorrentMovie";
import PirateBay from "./torrents/piratebay";
import OneThreeThreeSeven from "./torrents/x1337";
import Yts from "./torrents/yts";
import { existsSync } from "fs";
const log = console.log;
const program: Command = new Command();

const initilize = new Initilize(program);
initilize.displayHelp();

const optionsPassed = program.opts();
const page: number = isNaN(Number(optionsPassed.page))
  ? 1
  : Number(optionsPassed.page);
const keyword: "all" | "yts" | "x1337" | "pirateBay" =
  optionsPassed.key || "all";
const search: string = optionsPassed.search || "";
const file: string = optionsPassed.file
  ? optionsPassed.file + `${search}.json`
  : path.resolve(homedir(), `${search}.json`);

(async () => {
  if (search.length === 0 || !existsSync(path.dirname(file))) {
    initilize.displayHelp();
    process.exitCode = 1;
    throw new Error(
      "The search string should be greater than 1 or directory does not exists"
    );
  }
  log(chalk.blue("Loading torrents..."));
  const requests = [];
  if (keyword === "yts" || keyword === "all") {
    const yts = new Yts();
    requests.push(yts.generateResults(search, page));
  }
  if (keyword === "pirateBay" || keyword === "all") {
    const pirateBay = new PirateBay();
    requests.push(pirateBay.generateResults(search, page));
  }
  if (keyword === "x1337" || keyword === "all") {
    const x1337 = new OneThreeThreeSeven();
    requests.push(x1337.generateResults(search, page));
  }
  try {
    const responses = await Promise.allSettled(requests);
    const movies: ITorrentMovie[] = responses
      .map((response) =>
        response.status === "fulfilled" ? response.value.movies : []
      )
      .flat(1);
    if (movies.length > 0) {
      const cf = new CreateFile();
      cf.createJsonFile(movies, file);
    }
  } catch (error) {
    console.log(chalk.red("Some error occured"));
  }
})();
