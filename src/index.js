import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';
import DomHandler from './js/domHandler';
import StorageHandler from './js/storageHandler';

// since fetchGif is async, it returns a promise

const form = document.querySelector('form');
let domeWeatherObjects = [];

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

// Save to local storage
