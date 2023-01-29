import Notiflix from 'notiflix';


export default function fetchCountries(inputData) {
    return fetch(`https://restcountries.com/v3.1/name/${inputData}?fields=name,capital,population,flags,languages`).then(res => {
    if (!res.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
        };   
    return res.json();
    })
};

