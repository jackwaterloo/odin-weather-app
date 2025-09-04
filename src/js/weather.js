/**
 * Weather class for fetching and processing weather data from Visual Crossing API.
 */
export default class Weather {
  static #weatherUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  // This API key is free. It is rate limited. Doesn't matter if public.
  static #apikey = 'Q8DU8AYZ2E7KSWESNSQZ7FNEW';

  /**
   * Fetches weather data for a given location.
   * @param {string} location - The location to fetch weather data for.
   * @returns {Promise<Object|undefined>} An object containing location, temperature, conditions, timeZone, and icon, or undefined if an error occurs.
   */
  static async getWeatherData(location) {
    try {
      location = location.trim().toLowerCase();
      const url = Weather.#weatherUrl + location + `?key=${Weather.#apikey}`;

      const response = await fetch(url, { mode: 'cors' });

      // throws error if request is not successful
      if (response.status !== 200) {
        throw new Error(
          `Status code: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // grab data that we want
      const temp = data.currentConditions.temp;
      const conditions = data.currentConditions.conditions;
      const timeZone = data.timezone;
      const locationName = data.resolvedAddress;
      const icon = data.currentConditions.icon.replace(/-/g, ' ');

      // prettier-ignore
      return {
        'location': locationName,
        temp,
        conditions,
        timeZone,
        icon,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
