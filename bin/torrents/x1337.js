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
class OneThreeThreeSeven extends TorrentSuper_1.default {
    constructor() {
        super("x1337");
    }
    /**
     * async
     */
    generateSearch(page = 1, search) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!search) {
                throw new Error("Search is not a string");
            }
            const $ = yield this.getPageContent(`search/${search}/${page}`);
            return $;
        });
    }
    /**
     * getting the Page Content
     */
    /**
     * getSingleTorrent
     */
    getSingleTorrent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getPageContent(url);
            const torrentsDiv = $(".no-top-radius > div > ul > li");
            const magnet = $(".no-top-radius > div > ul:nth-child(1) > li:nth-child(1)")
                .find("a")
                .attr("href");
            const torrents = [];
            $(torrentsDiv)
                .find("ul")
                .find("li")
                .each((index, element) => {
                if (index > 1) {
                    torrents.push($(element).find("a").attr("href"));
                }
            });
            const uploader = $(torrentsDiv).find("span").find("a").text().trim();
            const description = $("#description > p.align-center").text().trim();
            const screenshot = [];
            $("#description > p.align-center > a > img").each((_, element) => {
                screenshot.push($(element).attr("src"));
            });
            return {
                torrent: torrents.length === 0 ? "" : torrents[torrents.length - 1],
                uploader,
                magnet,
                description,
                screenshot,
            };
        });
    }
    generateResults(search, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.generateSearch(page, search);
            const searchResultsTable = $("body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr");
            const totalPagesLi = $("div.pagination > ul > li");
            const totalPagesStrCheck1 = $(`body > main > div > div > div > div.box-info-detail.inner-table > div.pagination > ul > li:nth-child(${totalPagesLi.length}) > a`).text();
            const totalPagesStrCheck2 = $(`body > main > div > div > div > div.box-info-detail.inner-table > div.pagination > ul > li:nth-child(${totalPagesLi.length - 1}) > a`).text();
            let totalPagesStr = isNaN(Number(totalPagesStrCheck1))
                ? NaN
                : Number(totalPagesStrCheck1);
            totalPagesStr = isNaN(totalPagesStr)
                ? Number(totalPagesStrCheck2)
                : totalPagesStr;
            if (isNaN(Number(totalPagesStr)) || page > Number(totalPagesStr)) {
                return { movies: [], totalPages: Number(totalPagesStr) };
            }
            const totalPages = Number(totalPagesStr);
            let movies = [];
            searchResultsTable.each((_, element) => {
                const name = $(element).find("td").filter(".name").text().trim();
                const url = this.url +
                    $(element).find("td.coll-1.name > a:nth-child(2)").attr("href");
                const seeders = $(element)
                    .find("td")
                    .filter(".seeds")
                    .text()
                    .trim();
                const leechers = $(element)
                    .find("td")
                    .filter(".leeches")
                    .text()
                    .trim();
                const size = $(element).find("td").filter(".size").text().trim();
                movies.push({ name, url, seeders, leechers, size });
            });
            const responses = yield Promise.allSettled(movies.map(({ url }) => this.getSingleTorrent(url)));
            const other = responses.map((response) => {
                if (response.status === "fulfilled") {
                    return response.value;
                }
            });
            movies = movies.map((movie, index) => (Object.assign(Object.assign({}, movie), other[index])));
            return { totalPages, movies };
        });
    }
}
exports.default = OneThreeThreeSeven;
//# sourceMappingURL=x1337.js.map