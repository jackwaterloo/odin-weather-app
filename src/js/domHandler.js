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

  /**
   * Displays a fetch error message in the designated error container on the DOM.
   *
   * @static
   * @param {Error|string} error - The error object or message to display.
   */
  static displayFetchError(error){
    const errorDiv = document.querySelector('#error-div');
    errorDiv.innerHTML = '';

    const pElem = document.createElement('p');
    pElem.classList.add('error-font');
    pElem.textContent = `${error}`;

    errorDiv.appendChild(pElem);
  }

  /**
   * Clears the contents of the error message container in the DOM.
   * Selects the element with the ID 'error-div' and removes all its inner HTML.
   * Typically used to reset or hide error messages displayed to the user.
   */
  static clearError(){
    const errorDiv = document.querySelector('#error-div');
    errorDiv.innerHTML = '';
  }  
}
