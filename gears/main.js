import { wrapContent } from "./js/wrap.js";

document.querySelector('.action__print').addEventListener('click', () => {window.print()});
document.querySelector('.action__open-file').addEventListener('change', function (e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(this.files[0], "UTF-8");
    reader.onload = function(event) {
        console.log(event);
        console.log(event.target);
        wrapContent(event.target.result);
    }
    reader.onerror = function(event) {
        alert("Unable to read file.");
    }
});