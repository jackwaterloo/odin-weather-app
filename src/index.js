import './styles/main.css';
import Giphy from './js/giphy';

// since fetchGif is async, it returns a promise
Giphy.fetchGif('cat').then((jsonData) => {
  const img = document.querySelector('img');
  img.src = jsonData.data[0].images.original.url;
  img.alt = jsonData.data[0].alt_text;
});
