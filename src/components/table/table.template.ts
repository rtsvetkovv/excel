const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_: string) {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function toColumn(element: string) {
  return `
    <div class="column" data-type="resizable" >
      ${element}
      <div class="column-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content: string, index?: number) {
  const rowIndex = index ?? '';
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div class="row">
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
  const cells = new Array(colsCount).fill('').map(toCell).join('');

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(cells, i));
  }

  return rows.join('');
}
