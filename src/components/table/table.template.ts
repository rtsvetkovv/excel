const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row: number) {
  return (_: string, index: number) => `
    <div class="cell" contenteditable data-collindex="${index}" data-coords="${row}:${index}"></div>
  `;
}

function toColumn(element: string, index: number) {
  return `
    <div class="column" data-type="resizable" data-index="${index}">
      ${element}
      <div class="column-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content: string, index?: number) {
  const rowIndex = index ?? '';
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_: any, index: number) {
  const charCode = CODES.A + index;
  return String.fromCharCode(charCode);
}

export function createTable(rowsCount: number = 10) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(row)).join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
