const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(element: string) {
  return `
    <div class="column">${element}</div>
  `;
}

function createRow(content: string, index?: number) {
  const rowCount = index ?? '';

  return `
    <div class="row">
      <div class="row-info">${rowCount}</div>
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
  const collData = new Array(colsCount).fill('').map(createCell).join('');

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(collData, i));
  }

  return rows.join('');
}
