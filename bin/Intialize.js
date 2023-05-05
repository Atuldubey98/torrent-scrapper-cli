"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
class Initilize {
    constructor(program) {
        this.program = program;
    }
    figletDisplay(data) {
        (0, figlet_1.default)(data, (error, result) => {
            if (error) {
                throw new Error("Some error occured");
            }
            else {
                console.log(result);
            }
        });
    }
    /**
     * display commander help
     */
    displayHelp() {
        this.figletDisplay("Torrent Scrapper");
        this.program
            .name("Torrent Scrapper")
            .description("CLI to scrap torrents and get magnet urls with other meta data of magnet url")
            .option("-k, --key  <value>", "Specify the the torrent site to be scrapped eg -k all,yts,pirateBay")
            .option("-p, --page  <value>", "Specify the the torrent site to be scrapped eg -k all,yts,pirateBay")
            .requiredOption("-s, --search  <value>", "Specify the the torrent site to be scrapped eg -k all, yts, pirateBay")
            .option("-f, --file <value>", "If file has to generted please specify the location")
            .version("1.0.0")
            .parse(process.argv);
    }
}
exports.default = Initilize;
//# sourceMappingURL=Intialize.js.map