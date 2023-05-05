import { Command } from "commander";
import figlet from "figlet";

class Initilize {
  /**
   * figlet display
   */
  private program: Command;
  constructor(program: Command) {
    this.program = program;
  }
  public figletDisplay(data: string) {
    figlet(data, (error: Error, result: string) => {
      if (error) {
        throw new Error("Some error occured");
      } else {
        console.log(result);
      }
    });
  }
  /**
   * display commander help
   */
  public displayHelp() {
    this.figletDisplay("Torrent Scrapper");
    this.program
      .name("Torrent Scrapper")
      .description(
        "CLI to scrap torrents and get magnet urls with other meta data of magnet url"
      )
      .option(
        "-k, --key  <value>",
        "Specify the the torrent site to be scrapped eg -k all,yts,pirateBay,x1337. Default is all"
      )
      .option("-p, --page  <value>", "Specify the page number")
      .requiredOption(
        "-s, --search  <value>",
        "Specify the search keyword - mandatory"
      )
      .option(
        "-f, --file <value>",
        "Specify the location of file generated with / at the end of directory name. Default location is ${homedir}/$(search)-${date}-${page}"
      )
      .version("1.0.0")
      .parse(process.argv);
  }
}
export default Initilize;
