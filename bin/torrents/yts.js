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
class Yts extends TorrentSuper_1.default {
    constructor() {
        super("yts");
    }
    generateSearch(search, page = 1) {
        const _super = Object.create(null, {
            getPageContent: { get: () => super.getPageContent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield _super.getPageContent.call(this, `/browse-movies/${search}/all/all/1/latest/0/all`);
            const ytsDiv = $("body > div.main-content > div.browse-content > div > section > div > div.browse-movie-wrap");
            const movies = [];
            ytsDiv.each((_, element) => {
                const url = $(element).find("a").attr("href");
                const poster = $(element).find("a > figure > img").attr("src");
                const name = $(element).find("div.browse-movie-bottom > a").text();
                const year = $(element).find("div.browse-movie-year").text();
                movies.push({ name, url, year, poster });
            });
            return movies;
        });
    }
    /**
     * async
     */
    getSingleTorrent(url) {
        const _super = Object.create(null, {
            getPageContent: { get: () => super.getPageContent }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield _super.getPageContent.call(this, url);
            const torrents = [];
            const description = $("#synopsis > p.hidden-sm.hidden-md.hidden-lg")
                .text()
                .trim();
            const rating = $("#movie-info > div.bottom-info > div:nth-child(3) > span:nth-child(2)").text();
            $("#movie-info > p > a").each((_, element) => {
                const torrent = $(element).attr("href");
                const quality = $(element).text();
                torrents.push({ torrent, quality });
            });
            const screenshot = [];
            $("#screenshots > div").each((_, element) => {
                screenshot.push($(element).find("a").attr("href"));
            });
            return { torrents, description, rating, screenshot };
        });
    }
    /**
     * async generateResults for torrent
     */
    generateResults(search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let movies = yield this.generateSearch(search, page);
            if (page > 1) {
                return { movies: [], totalPages: 1 };
            }
            const responses = yield Promise.allSettled(movies.map((movie) => this.getSingleTorrent(movie.url)));
            const others = responses.map((response) => response.status === "fulfilled" ? response.value : {});
            movies = movies.map((movie, index) => {
                return Object.assign(Object.assign({}, movie), others[index]);
            });
            return { movies, totalPages: 1 };
        });
    }
}
exports.default = Yts;
//# sourceMappingURL=yts.js.map