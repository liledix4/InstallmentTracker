import { languages } from "./languages.js";

let langList = [];

export function wrapContent(obj) {
    obj.forEach(currData => {
        if (currData.title[0] === '<LANGUAGES>') {
            currData.list.forEach(arrElement => {
                $('.language-select').append(`<div value="${arrElement}">${languages[arrElement].langName}</div>`);
                $('.language-contents').append(`
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
                `);
                langList.push(arrElement);
            });
        }
        else {
            for (let currDataLang = 0; currDataLang < langList.length; currDataLang++) {
                $(`.language-contents > div[value="${langList[currDataLang]}"]`).append(`
                    <div class="row">
                        <div class="cell">${currData.title[currDataLang]}</div>
                        <div class="cell">` + parseInt(currData.monthly_payment).toLocaleString(languages[langList[currDataLang]].locale) + `</div>
                        <div class="cell">${currData.day_of_payment}</div>
                        <div class="cell">${currData.closest_month}</div>
                        <div class="cell">${currData.ends}</div>
                        <div class="cell">${currData.platform}</div>
                        <div class="cell">${currData.account}</div>
                    </div>
                `);
            }
        }
    });
    $('.language-select > div').click(function(){
        const lang = $(this).attr('value');
        $('.language-table.show').removeClass('show');
        $(`.language-table[value="${lang}"]`).addClass('show');
    });
    $('.language-table').eq(0).addClass('show');
}