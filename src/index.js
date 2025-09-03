import './styles/main.css';
import Giphy from './js/giphy';
import Weather from './js/weather';

// since fetchGif is async, it returns a promise
Giphy.fetchGif('cat').then((jsonData) => {
  const img = document.querySelector('img');
  img.src = jsonData.data[0].images.original.url;
  img.alt = jsonData.data[0].alt_text;
});

Weather.getWeatherData('atlanta').then((data) => {
  console.log('Received data:\n', data);
});
