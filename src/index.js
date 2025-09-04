import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';

// since fetchGif is async, it returns a promise

Weather.getWeatherData('tokyo').then((weatherData) => {
  console.log('Received weather function data:\n', weatherData);

  Giphy.fetchGif(weatherData.icon + " weather").then((gifData) => {
    console.log(gifData);
    const img = document.createElement('img');
    const div = document.createElement('div');
    for (const key in weatherData) {
      const p = document.createElement('p');
      p.textContent = weatherData[key];
      div.appendChild(p);
    }
    img.setAttribute("src",gifData.src);
    img.setAttribute("alt",gifData.altText);
    div.appendChild(img);
    const body = document.querySelector("body");
    body.appendChild(div);
  });
});
