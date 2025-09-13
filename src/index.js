import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';
import DomHandler from './js/domHandler';
import StorageHandler from './js/storageHandler';

// since fetchGif is async, it returns a promise

const form = document.querySelector('form');
let domeWeatherObjects = [];
const zipRegex = /^\d{5}(-\d{4})?$/;
const cityRegex = /^[A-Za-z\s,\-']{2,}$/;

// loads data if present in local storage
const localStorageData = StorageHandler.loadData();
if (localStorageData.length > 0) {
  domeWeatherObjects = domeWeatherObjects.concat(localStorageData);
  DomHandler.displayObjects(domeWeatherObjects);
}

// turn this into async
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.querySelector('#location-input').value;
  console.log(location);

  Weather.getWeatherData(location).then((weatherData) => {
    Giphy.fetchGif(weatherData.icon + ' weather').then((gifData) => {
      console.log(gifData);
      const domWeatherObject = { ...weatherData, ...gifData };
      domeWeatherObjects.push(domWeatherObject);
      StorageHandler.saveData(domWeatherObject);

      DomHandler.displayObjects(domeWeatherObjects);
    });
  });
});

// Form validation
// Link to documentation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#the_constraint_validation_api
const inputElem = document.querySelector('#location-input');
inputElem.addEventListener('input', () => {
  const inputValue = inputElem.value.trim();
  if (!inputValue.match(zipRegex) && !inputValue.match(cityRegex)) {
    inputElem.setCustomValidity('Type in a valid zip code or city!');
    console.log('invalid input')
  } else {
    inputElem.setCustomValidity(''); // if it is not cleared, will not be able to submit when valid
    console.log('valid input')
  }
});
