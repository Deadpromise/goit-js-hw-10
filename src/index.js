import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const MIN_COUNT = 2;
const MAX_COUNT = 10;

let userTyped = '';

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    userTyped = e.target.value.trim();
    if (userTyped === '') {
        clearListMarkup();
        clearInfoMarkup();
        return;
    }
    fetchCountries(userTyped).then((result) => {   
        if (result.length > MAX_COUNT) {
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            clearListMarkup();
            clearInfoMarkup();
            return;
        } else if (result.length >= MIN_COUNT && result.length <= MAX_COUNT) {
            // console.log('ot 2 do 10');
            clearInfoMarkup();
            buildFewCountries(result);
            return;
        } else {
            clearListMarkup();
            buildOneCountry(result);
            return;
        }
    }).catch(onFetchError)
};

function buildFewCountries(arr) {
    clearListMarkup();
    const markUp = arr.map(el => {
        return `<li class="country-item"><img class="country-list-flag" src="${el.flags.svg}" alt="${el.name.official} flag">
       <p class="country-list-name">${el.name.official}</p></li>`
        }).join('');
    // console.log(markUp);
    countryListRef.insertAdjacentHTML('beforeend', markUp);
}

function clearListMarkup() {
    countryListRef.innerHTML = '';
};

function buildOneCountry(arr) {
    clearInfoMarkup();
    const markUp = arr.map(el => {
        const countryLang = Object.values(el.languages).join(', ');
    
        return `<div class="country-title">
        <img class="country-solo-flag" src="${el.flags.svg}" alt="${el.name.official} flag">
        <p class="country-solo-name">${el.name.official}</p></div>
        <ul>
        <li class="country-solo-item">Capital:<span class="country-solo-span">${el.capital}</span></li>
        <li class="country-solo-item">Population:<span class="country-solo-span">${el.population}</span></li>
        <li class="country-solo-item">Languages:<span class="country-solo-span">${countryLang}</span></li>
        </ul>`
    }).join('');

    countryInfoRef.insertAdjacentHTML('beforeend', markUp);
};

function clearInfoMarkup() {
    countryInfoRef.innerHTML = '';
};

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearListMarkup();
    clearInfoMarkup();
    return;   
};