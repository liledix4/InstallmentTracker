import { languages } from "./languages.js";

let langList = [];

export function wrapContent(obj) {
    obj = JSON.parse(obj);

    document.querySelector('.language-select').innerHTML = '';
    document.querySelector('.language-contents').innerHTML = '';
    langList = [];

    obj.forEach(currData => {
        if (currData.title[0] === '<LANGUAGES>') {
            currData.list.forEach((arrElement) => {
                if (languages[arrElement]) {
                    document.querySelector('.language-select').innerHTML += `<div value="${arrElement}">${languages[arrElement].langName}</div>`;
                    document.querySelector('.language-contents').innerHTML += `
                        <div class="language-table" value="${arrElement}">
                            <div class="row title-row">
                                <div class="cell">${languages[arrElement].title}</div>
                                <div class="cell">${languages[arrElement].monthly_payment}</div>
                                <div class="cell">${languages[arrElement].day_of_payment}</div>
                                <div class="cell">${languages[arrElement].closest_month}</div>
                                <div class="cell">${languages[arrElement].ends}</div>
                                <div class="cell">${languages[arrElement].platform}</div>
                                <div class="cell">${languages[arrElement].account}</div>
                            </div>
                        </div>
                    `;
                    langList.push(arrElement);
                }
            });
        }
        else {
            for (let currDataLang = 0; currDataLang < langList.length; currDataLang++) {
                document.querySelector(`.language-contents > div[value="${langList[currDataLang]}"]`).innerHTML += `
                    <div class="row">
                        <div class="cell">${currData.title[currDataLang]}</div>
                        <div class="cell">` + parseInt(currData.monthly_payment).toLocaleString(languages[langList[currDataLang]].locale) + `</div>
                        <div class="cell">${currData.day_of_payment}</div>
                        <div class="cell">${currData.closest_month}</div>
                        <div class="cell">${currData.ends}</div>
                        <div class="cell">${currData.platform}</div>
                        <div class="cell">${currData.account}</div>
                    </div>
                `;
            }
        }
    });
    document.querySelectorAll('.language-select > div').forEach((element) => {
        element.addEventListener('click', (event) => {
            const lang = event.currentTarget.getAttribute('value');
            document.querySelector('.language-table.show').classList.remove('show');
            document.querySelector(`.language-table[value="${lang}"]`).classList.add('show');
        });
    });
    document.querySelectorAll('.language-table')[0].classList.add('show');
}