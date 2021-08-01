import './sass/main.scss';
import { fetchCountry } from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

countryCardTpl({});
countriesListTpl({});

const refs = {
     cardContainer: document.querySelector('.js-card-container'),
        searchBox: document.querySelector('#search-box'),
};
const DEBOUNCE_DELAY = 500;


refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.value;
  refs.cardContainer.innerHTML = '';
  if (searchQuery == "") {
      return;
  };

  fetchCountry(searchQuery)
      .then(countries => {
          if (countries.length === 1) {
            renderCountryCard(countries);
          }
          if (countries.length >= 2 && countries.length <= 10) {
            renderCountry(countries);
          }
          if (countries.length > 10) {
             Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');         
          }
          if (countries.status === 404) {
            error404();        
          }             
  })
  .catch(error404);
}

   function renderCountry(countries) {
   const list = countriesListTpl(countries);
   refs.cardContainer.innerHTML = list;
 }


function renderCountryCard(countries) {
  const countryExemplar = countries[0];

  countryExemplar.languages = countryExemplar.languages.map(language=>language.name).join(', '); 
  
  const markup = countryCardTpl(countryExemplar);
  refs.cardContainer.innerHTML = markup;
}


function error404(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}
