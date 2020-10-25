const CODES = {
  A: 65,
  Z: 90,
};

const getWidth = (tableState: any, index: any) =>
  `${tableState?.colState ? tableState.colState[index] : 120}px`;

function setColumnWidth(tableState: any) {
  return (element: string, index: number) => {
    const width = getWidth(tableState, index);

    return toColumn(element, index, width);
  };
}

function toCell(row: number, tableState: any) {
  return (_: string, index: number) => {
    const width = getWidth(tableState, index);

    return `
    <div
      class="cell"
      contenteditable
      data-collindex="${index}"
      data-coords="${row}:${index}"
      style="width: ${width}"
    >
    </div>
  `;
  };
}

function toColumn(element: string, index: number, width: string) {
  return `
    <div class="column" data-type="resizable" data-index="${index}" style="width: ${width}">
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
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_: string, index: number) {
  const charCode = CODES.A + index;
  return String.fromCharCode(charCode);
}

export function createTable(rowsCount: number = 10, tableState = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(setColumnWidth(tableState))
    .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row, tableState))
      .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
