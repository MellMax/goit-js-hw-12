const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}/?fields=name;capital;population;flag;languages`).then(response =>
    response.json(),
  );
}

export  { fetchCountry };


