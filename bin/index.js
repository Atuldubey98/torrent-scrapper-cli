#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const CreateFiles_1 = __importDefault(require("./CreateFiles"));
const Intialize_1 = __importDefault(require("./Intialize"));
const piratebay_1 = __importDefault(require("./torrents/piratebay"));
const x1337_1 = __importDefault(require("./torrents/x1337"));
const yts_1 = __importDefault(require("./torrents/yts"));
const fs_1 = require("fs");
const log = console.log;
const program = new commander_1.Command();
const initilize = new Intialize_1.default(program);
initilize.displayHelp();
const optionsPassed = program.opts();
const page = isNaN(Number(optionsPassed.page))
    ? 1
    : Number(optionsPassed.page);
const keyword = optionsPassed.key || "all";
const search = optionsPassed.search || "";
const fileName = `${search}-${Date.now()}-${page}.json`;
const file = optionsPassed.file
    ? optionsPassed.file + fileName
    : path_1.default.resolve((0, os_1.homedir)(), fileName);
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (search.length === 0 || !(0, fs_1.existsSync)(path_1.default.dirname(file))) {
        initilize.displayHelp();
        process.exitCode = 1;
        throw new Error("The search string should be greater than 1 or directory does not exists");
    }
    log(chalk_1.default.blue("Loading torrents..."));
    const requests = [];
    if (keyword === "yts" || keyword === "all") {
        const yts = new yts_1.default();
        requests.push(yts.generateResults(search, page));
    }
    if (keyword === "pirateBay" || keyword === "all") {
        const pirateBay = new piratebay_1.default();
        requests.push(pirateBay.generateResults(search, page));
    }
    if (keyword === "x1337" || keyword === "all") {
        const x1337 = new x1337_1.default();
        requests.push(x1337.generateResults(search, page));
    }
    try {
        const responses = yield Promise.allSettled(requests);
        const movies = responses
            .map((response) => response.status === "fulfilled" ? response.value.movies : [])
            .flat(1);
        if (movies.length > 0) {
            const cf = new CreateFiles_1.default();
            cf.createJsonFile(movies, file);
            log(chalk_1.default.green(`Generated results are available  in file ${file}`));
        }
        log(chalk_1.default.green(`Found ${movies.length} on page ${page}`));
    }
    catch (error) {
        console.log(chalk_1.default.red("Some error occured"));
    }
}))();
//# sourceMappingURL=index.js.map