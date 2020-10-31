export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export class Storage {
  public getData(key: string): object | undefined {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      console.warn('Local Storage Error: ', e.message);

      return undefined;
    }
  }

  public setData(key: string, data: object) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Local Storage Error: ', e.message);
    }
  }
}
