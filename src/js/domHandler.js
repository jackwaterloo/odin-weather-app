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
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3', 'col-12', 'col-md-6', 'mx-auto');
    cardDiv.setAttribute('style', 'width: 18rem');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    for (const key in weatherObject) {
      if (['src', 'altText', 'icon'].includes(key)) continue;
      let elem;
      if (key === 'location') {
        elem = document.createElement('h5');
        elem.innerHTML = `<strong>${weatherObject[key]}</strong>`;
        elem.classList.add(['card-title']);
      } else {
        elem = document.createElement('p');
        elem.innerHTML = `<strong>${key}:</strong> ${weatherObject[key]}`;
        elem.classList.add('card-text');
      }
      cardBody.appendChild(elem);
    }
    img.setAttribute('src', weatherObject.src);
    img.setAttribute('alt', weatherObject.altText);
    img.classList.add('card-img-bottom');
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    return cardDiv;
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
  static clearLoading() {
    const loadingElem = document.querySelector('#loading-elem');
    if (loadingElem) {
      loadingElem.textContent = '';
    }
  }
}
