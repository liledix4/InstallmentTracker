import { wrapContent } from './js/wrap.js';
const version = 'Version 0.2';

document.querySelector('.version-number').innerHTML = version;

document.querySelector('.action__print').addEventListener('click', () => {window.print()});
document.querySelector('.action__open-file_hidden').addEventListener('change', function (e) {
    e.preventDefault();
    if (this.files[0]) {
        const reader = new FileReader();
        reader.readAsText(this.files[0], 'UTF-8');
        reader.onload = function(event) {
            wrapContent(event.target.result);
        }
        reader.onerror = function(event) {
            alert('Unable to read file.');
        }
    }
});
document.querySelector('.action__open-file').addEventListener('click', function () {
    document.querySelector('.action__open-file_hidden').click();
});