import { languages } from './languages.js';

let langList = [];

function getDates(day, start, closest, end, locale)
{
    let returnObject =
    {
        numbers:
        {
            done: [],
            overdue: [],
            remaining: [],
        },
        strings:
        {
            done: [],
            overdue: [],
            remaining: [],
        },
    };
    const todayObject = new Date();
    const today =
    {
        D: todayObject.getDate(),
        M: todayObject.getMonth(),
        Y: todayObject.getFullYear(),
    };

    const startArray = start.split('.');
    const closestArray = closest.split('.');
    const endArray = end.split('.');
    const o =
    {
        sM: parseInt(startArray[1]) - 1,
        sY: parseInt(startArray[0]),
        cM: parseInt(closestArray[1]) - 1,
        cY: parseInt(closestArray[0]),
        eM: parseInt(endArray[1]) - 1,
        eY: parseInt(endArray[0]),
    };

    for (let currYear = o.sY; currYear <= o.eY; currYear++)
    {
        let startMonth = 0;
        let endMonth = 11;
        if (currYear === o.sY) startMonth = o.sM;
        if (currYear === o.eY) endMonth = o.eM;

        for (let currMonth = startMonth; currMonth <= endMonth; currMonth++)
        {
            const readableDateObject = new Date(currYear, currMonth, day);
            const readableFormat = {day: 'numeric', month: 'short', year: 'numeric'};
            const readableString = readableDateObject.toLocaleString(locale, readableFormat);
            const dateArray = [currYear, currMonth, day];

            if (
                o.cY > currYear ||
                (o.cY == currYear && o.cM > currMonth)
            )
            {
                returnObject.numbers.done.push( dateArray );
                returnObject.strings.done.push( readableString );
            }
            else if (
                currYear < today.Y ||
                (currYear == today.Y && currMonth < today.M) ||
                (currYear == today.Y && currMonth == today.M && day <= today.D)
            )
            {
                returnObject.numbers.overdue.push( dateArray );
                returnObject.strings.overdue.push( readableString );
            }
            else
            {
                returnObject.numbers.remaining.push( dateArray );
                returnObject.strings.remaining.push( readableString );
            }
        }
    }
    return returnObject;
}

export function wrapContent(obj)
{
    obj = JSON.parse(obj);
    if (!obj.list) return;


    document.querySelector('.language-select').innerHTML = '';
    document.querySelector('.contents').innerHTML = '';
    langList = [];


    if (obj.languages) obj.languages.forEach(
        language => {
            if (languages[language]) langList.push(language);
            else langList.push(null);
        }
    );
    else {langList.push('English');}


    langList.forEach(language =>
    {
        if (language !== null)
        {
            document.querySelector('.language-select').innerHTML += `<div value='${language}'>${languages[language].langName}</div>`;
            document.querySelector('.contents').innerHTML += `<div class='language-table' value='${language}'></div>`;
        }
    });


    for (let langIndex = 0; langIndex < langList.length; langIndex++)
    {
        if (langList[langIndex] !== null)
            {
            const currLang = languages[langList[langIndex]]['locale'];

            obj.list.forEach(currJSONObj =>
            {
                let finalStrings = {
                    title: currJSONObj.title[langIndex],
                    platform: '?',
                    account: '?',
                    monthly_payment: parseInt(currJSONObj.monthly_payment).toLocaleString(languages[langList[langIndex]].locale) + ' ' + obj.currency[langIndex],
                    dates: ''
                };
                if (obj.platforms[currJSONObj.platform][langIndex])
                    finalStrings.platform = obj.platforms[currJSONObj.platform][langIndex];
                if (obj.accounts[currJSONObj.account][langIndex])
                    finalStrings.account = obj.accounts[currJSONObj.account][langIndex];

                const listOfDates = getDates(
                    currJSONObj.day_of_payment,
                    currJSONObj.started,
                    currJSONObj.closest_month,
                    currJSONObj.ends,
                    currLang
                );

                listOfDates.strings.done.forEach(date => {
                    finalStrings.dates += `<div class='done'>${date}</div>`;
                });
                listOfDates.strings.overdue.forEach(date => {
                    finalStrings.dates += `<div class='overdue'>${date}</div>`;
                });
                listOfDates.strings.remaining.forEach(date => {
                    finalStrings.dates += `<div>${date}</div>`;
                });

                document.querySelector(`.contents > div[value='${langList[langIndex]}']`).innerHTML += `
                    <div class='row'>
                        <div class='meta'>
                            <div class='title'>${finalStrings.title}</div>
                            <div class='right'>
                                <div>${finalStrings.platform}</div>
                                <div>${finalStrings.account}</div>
                                <div><strong>${finalStrings.monthly_payment}</strong></div>
                            </div>
                        </div>
                        <div class='dates'>${finalStrings.dates}</div>
                    </div>
                `;
            });
        }
    }


    document.querySelectorAll('.language-select > div').forEach((element) =>
    {
        element.addEventListener('click', (event) =>
        {
            const lang = event.currentTarget.getAttribute('value');
            document.querySelector('.language-table.show').classList.remove('show');
            document.querySelector(`.language-table[value='${lang}']`).classList.add('show');
        });
    });
    document.querySelectorAll('.language-table')[0].classList.add('show');
}