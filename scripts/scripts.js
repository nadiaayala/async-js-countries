
const elements = {
    container: document.querySelector('#container'),
    divCountries: document.querySelector('#countries'),
    divFavorites: document.querySelector('#favorites'),
    ulCountries: document.querySelector('.countries-list'),
    ulFavorites: document.querySelector('.fav-list'),
    countCountries: document.querySelector('.countries-number'),
    countFavorites: document.querySelector('.favorites-number'),
    totalPopulationList: document.querySelector('.population-total'),
    totalPopulationFav: document.querySelector('.population-favorites'),
    btnsAddFav: document.querySelector('.btn-add-fav')
};

let state = {
    favorites: [],
    countries: [],
    countCountries: 0,
    countFavorites: 0,
    totalPopulationList: 0,
    totalPopulationList: 0,
    numberFormat: null,
};

var countriesController = (function(){

});

var UIController = (function(){
    
});

var controller = (function(countryCtrl, UICtrl){
    
}, countriesController, UIController);

async function fetchData () {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const parsedElements = parseElements(json);
    state.countries = parsedElements;
    renderList(state.countries);
} 

function parseElements(elements){
    
    let newArr= [];
    elements.forEach(function(el, index) {
        let newEl = {
            name: el.translations.pt,
            abbr: el.alpha3Code.toLowerCase(),
            id: parseInt(el.numericCode),
            population: el.population,
            flag: el.flag,
            index: index
        };
        newArr.push(newEl);
    });
    return newArr;
}

//Event listeners
window.addEventListener('load', () => {
    start();
    numberFormat = Intl.NumberFormat('pt-BR');
})

elements.container.addEventListener('click', e => {
    const div = e.target.parentNode.parentNode;
    const id = parseInt(div.id);
    const parent = div.parentNode;
    if(parent.classList.contains('countries-list')){
        const element = state.countries.findIndex(el => el.id === id);
        
        addCountryToList(id, favorites);
        deleteElementFromList(id, state.countries);
        deleteElementUI(div);

        clearLists();
        reorderLists();
        renderList(state.countries);
        renderList(state.favorites);
        
    }
    else if(parent.classList.contains('fav-list')) {
        const index = state.favorites.findIndex(el => el.id === id);
        const position = div.dataset.index;
        console.log(state.favorites[index].id,);
        addAtIndex(position, state.favorites[index]);

        deleteElementFromList(id, state.favorites);
        deleteElementUI(div); 
        
        clearLists();

        reorderLists();
        renderList(state.countries);
        renderList(state.favorites);
        

    }
    
});

//DATA FUNCTIONS

let addCountryToList = (elId, list) => {
    const ID = parseInt(elId);
    const listFrom = list === state.countries ? state.favorites : state.countries ;
    
    const index = listFrom.findIndex(el => el.id === ID);
    const listToAdd = list === countries ? state.countries : state.favorites ;
    const element = listFrom[index];

    listToAdd.push(element);
    // listFrom.splice(index, 1);
    return element;
    
};

let addAtIndex = (index, el) => {
    state.countries.splice(index, 0, el);
    return state.countries;
};

let deleteCountryFromList = (id , list) => {
    const index = list.findIndex(arrEl => arrEl.id === id); 
    list.splice(index, 1);
    return countries;
};

let calcTotalPopulation = () => {
    const totalPopulation = state.countries.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0);

      const totalFavorites = state.favorites.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0);
      elements.totalPopulationList.textContent = totalPopulation.toLocaleString('pt-BR');
      elements.totalPopulationFav.textContent = totalFavorites.toLocaleString('pt-BR');
};

let reorderLists = () => {
    state.countries.sort((a, b) => a.name.localeCompare(b.name));
    state.favorites.sort((a, b) => a.name.localeCompare(b.name));
};


function start(){
    console.log('Application has started running.');
    fetchData();
    renderSummary();
}

//UI functions
let renderList = (list) => {
    const parent = list === state.countries ? elements.ulCountries : elements.ulFavorites;
 list.forEach(el => createMarkup(el, parent));
    renderSummary();
};

let renderSummary = () => {
    elements.countCountries.textContent = state.countries.length;
    elements.countFavorites.textContent = state.favorites.length;
    calcTotalPopulation();
};

let clearLists = () => {
    elements.ulCountries.textContent = '';
    elements.ulFavorites.textContent = '';
};

let deleteElementUI = (target) => {
    const div = target;
    div.parentNode.removeChild(div);
};
//<a id="${id}" class="waves-effect waves-light btn">+</a>

let createMarkup = (el, parent) => {
    const {name, abbr, id, population, flag, index} = el;
    const signal = parent === elements.ulCountries ? '+' : 'x';
    let btnClass = 'waves-effect waves-light btn ';
    // if(parent === elements.ulCountries) {
    //     btnClass = 
    // }
    if(parent === elements.ulFavorites) {
        btnClass = btnClass.concat('red darken-4');
    }
    const markup = `
    <div class="country" id="${id}" data-index="${index}">
        <div class="country-btn"> 
            <button class="${btnClass}"> ${signal} </button>
        </div>
        <div class="flag">
            <img src="https://restcountries.eu/data/${abbr}.svg" class="flag-img">
        </div>
        <ul class="country-info">
            <li> ${name}</li>
            <li> ${population.toLocaleString('pt-BR')}</li>
        </ul>
    </div>
    `;
    const div = parent === elements.ulCountries ? elements.ulCountries : elements.ulFavorites;
    div.insertAdjacentHTML('beforeend', markup);
};



