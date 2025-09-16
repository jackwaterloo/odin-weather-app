/**
 * Giphy class for fetching GIFs from the Giphy API.
 */
export default class Giphy {
  static #giphy_url = 'https://api.giphy.com/v1/gifs/translate';
  // This API key is free. It is rate limited. Doesn't matter if public.
  static #api_key = 'ISRMFiS2uKKNjdvuekSn5FhFwAMX8ocM';

  // no need for constructor since we will just be calling static methods from Giphy class
  constructor() {}

  /**
   * Fetches a GIF from Giphy based on the provided search term.
   * @param {string} searchTerm - The term to search for GIFs.
   * @returns {Promise<Object|undefined>} An object containing src and altText of the GIF, or undefined if an error occurs.
   */
  // static function because we will not be using it on an instance of "Giphy"
  static async fetchGif(searchTerm) {
    try {
      // need to add parameters into URL manually. Fetch does not accept parameters.
      const url = `${Giphy.#giphy_url}?api_key=${Giphy.#api_key}&s=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url, { mode: 'cors' });

      // throws error if request is not successful
      if (response.status !== 200) {
        throw new Error(`giphy API Status code: ${response.status}`);
      }

      const data = await response.json();
      console.log('giphy json data: \n', data);
      const src = data.data.images.original.url;
      const altText = data.data.title;
      return {
        src,
        altText,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
