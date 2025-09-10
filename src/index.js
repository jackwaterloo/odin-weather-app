import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';
import DomHandler from './js/domHandler';

// since fetchGif is async, it returns a promise

const form = document.querySelector('form');
const domeWeatherObjects = [];

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

      DomHandler.displayObjects(domeWeatherObjects);

    });
  });
});

// Create DOM manipulation class so that data can be auto updated into DOM

// Save to local storage
