import {$, $$, send} from './utils.js';

// 1. defaultList
let countriesAndTopCities = async () => {
    let db = await send('db_cities.json');
    db.RU.forEach(country => {
        let sortedCities = country.cities.sort((a, b) => b.count - a.count);
        let sortedCitiesHTML = ``;
        for (let i = 0; i < 3; i++) {
            const city = sortedCities[i];
            sortedCitiesHTML += `
                <div class="dropdown-lists__line">
                    <div class="dropdown-lists__city dropdown-lists__city--ip">${city.name}</div>
                    <div class="dropdown-lists__count">${city.count}</div>
                </div>
            `
        }
        let defaultListHtml = `
            <div class="dropdown-lists__countryBlock">
                <div class="dropdown-lists__total-line">
                    <div class="dropdown-lists__country">${country.country}</div>
                    <div class="dropdown-lists__count">${+country.count}</div>
                </div>
                ${sortedCitiesHTML}
            </div>
        `
        $('.dropdown-lists__list--default .dropdown-lists__col').innerHTML += defaultListHtml;
    })
    $$('.dropdown-lists__total-line').forEach(node => node.addEventListener('click', openCountry));
}

// 2. selectedList
let openCountry = (event) => {
    send('db_cities.json')
    .then(db => {
        db.RU.forEach(country => {
            if (event.target.textContent.search(country.country) == 0) {
                $('.dropdown-lists__list--default').style.display = 'none';
                let citiesHTML = '';
                country.cities.forEach(city => {
                    citiesHTML += `
                        <div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">${city.name}</div>
                            <div class="dropdown-lists__count">${city.count}</div>
                        </div>
                    `
                })
                let selectListHtml = `
                    <div class="dropdown-lists__countryBlock">
                        <div class="dropdown-lists__total-line">
                            <div class="dropdown-lists__country">${country.country}</div>
                            <div class="dropdown-lists__count">${country.count}</div>
                        </div>
                        ${citiesHTML}
                    </div>
                `
                $('.dropdown-lists__list--select .dropdown-lists__col').innerHTML = selectListHtml;
                $('.dropdown-lists__list--select').style.display = 'block';

                $('.dropdown-lists__list--select .dropdown-lists__total-line').addEventListener('click', backToDefaultList)
                }
            })
        })
}

let backToDefaultList = () => {
    $('.dropdown-lists__list--select').style.display = 'none';
    $('.dropdown-lists__list--default').style.display = 'block';
}

// 3. autocompleteList
let db;
async function getDB() {
    db = await send('db_cities.json')
}
getDB()

let searchCity = () => {
    $('.dropdown-lists__list--autocomplete .dropdown-lists__col').innerHTML = '';
    let query = event.target.value.toLowerCase();
    if (query != '') {
        let searchResult = '';
        db.RU.forEach(country => {
            let findCitiesHTML = '';
            let countryBlockHTML = '';
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) {
                    findCitiesHTML += `
                    <div class="dropdown-lists__line">
                        <div class="dropdown-lists__city">${city.name}</div>
                        <div class="dropdown-lists__count">${city.count}</div>
                    </div>
                    `
                }
            })
            if (findCitiesHTML != '') {
                countryBlockHTML = `
                    <div class="dropdown-lists__countryBlock">
                        <h3>${country.country}</h3>
                        ${findCitiesHTML}
                    </div>
                `
            }
            searchResult += countryBlockHTML
        })
        
        $('.dropdown-lists__list--default').style.display = 'none';
        $('.dropdown-lists__list--select').style.display = 'none';
        
        if (searchResult == '') searchResult = 'Нихуя не найдено'
        $('.dropdown-lists__list--autocomplete .dropdown-lists__col').innerHTML = searchResult;
        $('.dropdown-lists__list--autocomplete').style.display = 'block';
    
    } else {
        $('.dropdown-lists__list--autocomplete').style.display = 'none';
        $('.dropdown-lists__list--default').style.display = 'block';
    }

}

export {countriesAndTopCities, searchCity};