export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const storage = (key: string, data?: object): object | undefined => {
  try {
    if (!data) {
      return JSON.parse(localStorage.getItem(key) || '');
    }

    localStorage.setItem(key, JSON.stringify(data));

    return undefined;
  } catch (e) {
    console.warn('Local Storage Error: ', e.message);

    return undefined;
  }
};
