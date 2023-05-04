import ITorrentMovie from "./interfaces/ITorrentMovie";
import fs from "fs";
import os from "os";
import path from "path";
class CreateFile {
  /**
   * createJsonFile
   */
  public createJsonFile(movies: ITorrentMovie[], location: string) {
    fs.writeFile(
      location,
      JSON.stringify(movies, null, "\t"),
      "utf-8",
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  }
}

export default CreateFile;
