import { wrapContent } from "./js/wrap.js";

document.querySelector('.action__open-file').addEventListener('change', function (e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsText(this.files[0], "UTF-8");
    reader.onload = function (evt) {
        wrapContent(evt.target.result);
    }
});