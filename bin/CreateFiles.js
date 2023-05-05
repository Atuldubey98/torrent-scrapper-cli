"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class CreateFile {
    /**
     * createJsonFile
     */
    createJsonFile(movies, location) {
        fs_1.default.writeFile(location, JSON.stringify(movies, null, "\t"), "utf-8", (error) => {
            if (error) {
                throw error;
            }
        });
    }
}
exports.default = CreateFile;
//# sourceMappingURL=CreateFiles.js.map