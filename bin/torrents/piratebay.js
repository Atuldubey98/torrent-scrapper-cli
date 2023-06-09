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
const TorrentSuper_1 = __importDefault(require("./TorrentSuper"));
class PirateBay extends TorrentSuper_1.default {
    constructor() {
        super("pirateBay");
    }
    generateResults(search, page = 1) {
        const _super = Object.create(null, {
            getPageContent: { get: () => super.getPageContent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield _super.getPageContent.call(this, `/search/${search}/1/99/${page}`);
            const table = $("#searchResult > tbody > tr");
            const totalPagesDiv = $(`#searchResult > tbody > tr:nth-child(${table.length - 1}) > td`)
                .text()
                .trim()
                .split(" ");
            const totalPages = totalPagesDiv.length > 0
                ? Number(totalPagesDiv[totalPagesDiv.length - 1])
                : 0;
            if (totalPages < page) {
                return {
                    movies: [],
                    totalPages,
                };
            }
            const movies = [];
            $(table).each((_, tr) => {
                const category = $(tr).find("td > center > a").text().trim();
                const name = $(tr).find("td > .detName > a").text();
                const url = $(tr).find("td > .detName > a").attr("href");
                const magnet = $(tr).find("td > a").attr("href");
                let seeders = "";
                let leechers = "";
                $(tr)
                    .find("td")
                    .each((index, td) => {
                    seeders = index === 2 ? $(td).text() : seeders;
                    leechers = index === 3 ? $(td).text() : leechers;
                });
                if (url && name) {
                    movies.push({ name, url, magnet, category, leechers, seeders });
                }
            });
            return { totalPages, movies };
        });
    }
}
exports.default = PirateBay;
//# sourceMappingURL=piratebay.js.map