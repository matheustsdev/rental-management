/**
   * Filters a list of objects based on a search text, checking multiple properties.
   * @param items - The list of objects to be filtered.
   * @param searchText - The text to search for within the properties.
   * @param properties - An array of property names that should be checked.
   * @returns A new list containing only the objects that match the filter.
   */
  export function filterByProperties<T>(items: T[], searchText: string, properties: (keyof T)[]): T[] {
    if (!searchText) {
      return items;
    }

    const lowercasedSearchText = searchText.toLowerCase();

    return items.filter((item) => {
      return properties.some((prop) => {
        const value = item[prop];

        if (value != null) {
          return String(value).toLowerCase().includes(lowercasedSearchText);
        }

        return false;
      });
    });
  }
