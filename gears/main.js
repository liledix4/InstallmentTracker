import { wrapContent } from "./js/wrap.js";
import { readFile } from "./modules/JS-ReadFile/ReadFile.js";

readFile('../data.json', 'application/json', jsonContents => {
    wrapContent(JSON.parse(jsonContents));
});