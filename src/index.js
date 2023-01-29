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
        return alert('pusto');
    }
    fetchCountries(userTyped).then((result) => {
        
        if (result.length > MAX_COUNT) {
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            return;
        } else if (result.length >= MIN_COUNT || result.length <= MAX_COUNT) {
            console.log('ot 2 do 10');
            buildFewCountries(result);
        };
        console.log(result);
    }).catch()
};

function buildFewCountries(arr) {
    const markUp = arr.map(el => {
       return `<li class="country-item"><img class="country-flag" src="${el.flags.svg}" alt="${el.name.official} flag"><p>${el.name.official}</p></li>`
        }).join('');
    // console.log(markUp);
    countryListRef.insertAdjacentHTML('beforeend', markUp);
}


//  console.log(el.name.official);