import { Coordinates } from './Table';

export const shouldResize = (event: MouseEvent) => {
  return event.target instanceof HTMLElement && event.target.dataset.resize;
};

export const range = (start: number, end: number) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
};

export const matrix = (targetCoordinates: Coordinates, currentCoordinates: Coordinates) => {
  const cols = range(currentCoordinates.col, targetCoordinates.col);
  const rows = range(currentCoordinates.row, targetCoordinates.row);

  const coordinates = cols.reduce((acc: Array<string>, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return coordinates;
};
