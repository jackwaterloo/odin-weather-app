export default class StorageHandler {
  /**
   * Loads all data from localStorage and returns it as an array.
   * @returns {Array} Array of parsed objects from localStorage.
   */
  static loadData() {
    if (localStorage.length === 0) {
      return [];
    }

    let data = [];

    Object.keys(localStorage).forEach((key) => {
      data = data.concat(JSON.parse(localStorage.getItem(key)));
    });

    return data;
  }

  static saveData(objectArray) {
    localStorage.setItem(crypto.randomUUID(), JSON.stringify(objectArray));
  }

  static clearData() {
    localStorage.clear();
  }
}
