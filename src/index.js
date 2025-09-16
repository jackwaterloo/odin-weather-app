import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';
import DomHandler from './js/domHandler';
import StorageHandler from './js/storageHandler';

// since fetchGif is async, it returns a promise

const form = document.querySelector('form');
let domeWeatherObjects = [];
let isLoading = false;
const zipRegex = /^\d{5}(-\d{4})?$/;
const cityRegex = /^[A-Za-z\s,\-']{2,}$/;

// loads data if present in local storage
const localStorageData = StorageHandler.loadData();
if (localStorageData.length > 0) {
  domeWeatherObjects = domeWeatherObjects.concat(localStorageData);
  DomHandler.displayObjects(domeWeatherObjects);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // logic to prevent multiple submits during loading
  if (isLoading) {
    return;
  }

  isLoading = true;

  const location = document.querySelector('#location-input').value;
  DomHandler.displayLoading(location);
  DomHandler.clearError();

  Weather.getWeatherData(location)
    .then((weatherData) => {
      Giphy.fetchGif(weatherData.icon + ' weather').then((gifData) => {
        console.log(gifData);
        const domWeatherObject = { ...weatherData, ...gifData };
        domeWeatherObjects.push(domWeatherObject);
        StorageHandler.saveData(domWeatherObject);

        DomHandler.displayObjects(domeWeatherObjects);
        DomHandler.displayLoadComplete(location);
        isLoading = false;
      });
    })
    .catch((err) => {
      const errString = err.toString().toLowerCase();
      isLoading = false;
      DomHandler.clearLoading();
      switch (errString) {
        case 'error: weather api status code: 400':
          DomHandler.displayFetchError(
            'Invalid location for weather API. Check spelling or input a new location'
          );
          break;
        case 'error: weather api status code: 429':
          DomHandler.displayFetchError(
            'Weather API request limit reached. Wait and try again later.'
          );
          break;
        case 'error: giphy api status code: 400':
          DomHandler.displayFetchError(
            'Bad request to Giphy API. Search argument bad.'
          );
          break;
        case 'error: giphy api status code: 429':
          DomHandler.displayFetchError(
            'Giphy API request limit reached. Wait and try again later.'
          );
          break;
        default:
          DomHandler.displayFetchError(
            'The following error occurred:\n' + errString
          );
      }
    });
});

// Form validation
// Link to documentation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#the_constraint_validation_api
const inputElem = document.querySelector('#location-input');
inputElem.addEventListener('input', () => {
  const inputValue = inputElem.value.trim();
  if (!inputValue.match(zipRegex) && !inputValue.match(cityRegex)) {
    inputElem.setCustomValidity('Type in a valid zip code or city!');
  } else {
    inputElem.setCustomValidity(''); // if it is not cleared, will not be able to submit when valid
  }
});
