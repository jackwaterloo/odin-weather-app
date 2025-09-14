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
  static displayFetchError(error) {
    const errorDiv = document.querySelector('#error-div');
    errorDiv.innerHTML = '';

    const pElem = document.createElement('p');
    // Add classes maybe
    pElem.textContent = `${error}`;

    errorDiv.appendChild(pElem);
  }

  /**
   * Clears the contents of the error message container in the DOM.
   * Selects the element with the ID 'error-div' and removes all its inner HTML.
   * Typically used to reset or hide error messages displayed to the user.
   */
  static clearError() {
    const errorDiv = document.querySelector('#error-div');
    errorDiv.innerHTML = '';
  }

  /**
   * Displays a loading message for the specified location in the loading-div.
   * @param {string} location - The location being loaded.
   */
  static displayLoading(location) {
    const loadingDiv = document.querySelector('#loading-div');
    loadingDiv.innerHTML = '';

    const pElem = document.createElement('p');
    // Add classes maybe
    pElem.id = 'loading-elem';
    pElem.textContent = `${location} loading...`;

    loadingDiv.appendChild(pElem);
  }

  /**
   * Updates the loading message to indicate data has loaded for the specified location.
   * @param {string} location - The location for which data has loaded.
   */
  static displayLoadComplete(location) {
    const pElem = document.querySelector('#loading-elem');

    pElem.textContent = `${location} data loaded!`;
  }

  /**
   * Clears the loading message from the loading-div in the DOM.
   * Removes the text content of the element with id 'loading-elem' if it exists.
   */
  static clearLoading(){
    const loadingElem = document.querySelector('#loading-elem');
    if (loadingElem) {
      loadingElem.textContent = '';
    }
  }
}
