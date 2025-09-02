export default class Giphy {
  static #giphy_url = 'https://api.giphy.com/v1/gifs/search';
  // This API key is free. It is rate limited. Doesn't matter if public.
  static #api_key = 'ISRMFiS2uKKNjdvuekSn5FhFwAMX8ocM';

  // no need for constructor since we will just be calling static methods from Giphy class
  constructor() {}

  // static function because we will not be using it on an instance of "Giphy"
  static async fetchGif(searchTerm) {
    try {
      // need to add parameters into URL manually. Fetch does not accept parameters.
      const url = `${Giphy.#giphy_url}?api_key=${Giphy.#api_key}&q=${encodeURIComponent(searchTerm)}&limit=1`;
      const response = await fetch(url, { mode: 'cors' });

      // throws error if request is not successful
      if (response.status !== 200) {
        throw new Error(`Status code: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Gif:', error);
    }
  }
}
