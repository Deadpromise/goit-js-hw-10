export default function fetchCountries(inputData) {
    return fetch(`https://restcountries.com/v3.1/name/${inputData}?fields=name,capital,population,flags,languages`).then(res => { 
    return res.json();
    })
};

