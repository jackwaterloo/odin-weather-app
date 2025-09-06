import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';

// since fetchGif is async, it returns a promise

const form = document.querySelector('form');

// turn this into async
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.querySelector('#location-input').value;
  console.log(location);

  Weather.getWeatherData(location).then((weatherData) => {
    Giphy.fetchGif(weatherData.icon + ' weather').then((gifData) => {
      console.log(gifData);
      const img = document.createElement('img');
      const div = document.createElement('div');
      for (const key in weatherData) {
        const p = document.createElement('p');
        p.textContent = weatherData[key];
        div.appendChild(p);
      }
      img.setAttribute('src', gifData.src);
      img.setAttribute('alt', gifData.altText);
      div.appendChild(img);
      const body = document.querySelector('body');
      body.appendChild(div);
    });
  });
});

// Create DOM manipulation class so that data can be auto updated into DOM
