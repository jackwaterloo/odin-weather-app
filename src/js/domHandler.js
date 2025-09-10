/**
 * Handles rendering and DOM manipulation for weather data.
 */
export default class DomHandler {
  /**
   * Renders weather objects to the DOM inside #weather-content.
   * @param {Object[]} weatherObjects - Array of weather data objects to display.
   */
  static displayObjects(weatherObjects) {
    const domWeatherContent = document.querySelector('#weather-content');
    domWeatherContent.innerHTML = '';

    if (!weatherObjects || weatherObjects == 0) {
      return;
    }

    for (const weatherObject of weatherObjects) {
      const weatherDiv = DomHandler.#createWeatherElement(weatherObject);
      domWeatherContent.appendChild(weatherDiv);
    }
  }

  /**
   * Creates a DOM element representing weather data.
   * @param {Object} weatherObject - Object containing weather properties and image info.
   * @returns {HTMLDivElement} The DOM element containing weather info and image.
   */
  static #createWeatherElement(weatherObject) {
    const img = document.createElement('img');
    const div = document.createElement('div');
    for (const key in weatherObject) {
      if (['src', 'altText', 'icon'].includes(key)) continue;
      const p = document.createElement('p');
      p.textContent = weatherObject[key];
      div.appendChild(p);
    }
    img.setAttribute('src', weatherObject.src);
    img.setAttribute('alt', weatherObject.altText);
    div.appendChild(img);

    return div;
  }
}
