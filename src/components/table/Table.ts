import { DomType, $ } from 'core/dom';
import { ExcelComponent } from 'core/ExcelComponent';
import { createTable } from './table.template';
import { handleResize } from './table.resize';
import { shouldResize, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';

export type Coordinates = {
  col: number;
  row: number;
};

export class Table extends ExcelComponent {
  static className = 'excel__table';
  selection?: TableSelection;

  constructor($root: DomType, options: any) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-coords="0:0"]');
    if (!$cell) return;

    this.selection?.select($cell);

    this.$on('formula:input', (data: any) => {
      this.selection?.current?.text(data);
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event: MouseEvent) {
    if (shouldResize(event)) {
      handleResize(this.$root, event);
    }
  }

  onClick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return;

    const $cell = $(event.target);

    const isEditableCell = $cell.data?.coords;
    if (!isEditableCell) return;

    if (event.shiftKey) {
      const targetCoordinates = $(event.target).coords(true) as Coordinates;
      const currentCoordinates = this.selection?.current?.coords(true) as Coordinates;

      const $cells = matrix(targetCoordinates, currentCoordinates).map((coordinate) =>
        this.$root.find(`[data-coords="${coordinate}"]`)
      ) as Array<DomType>;

      this.selection?.selectGroup($cells);
    } else {
      this.selection?.select($cell);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];

    const { key, shiftKey } = event;

    if (keys.includes(key) && !shiftKey) {
      event.preventDefault();

      const coordinates = this.selection?.current?.coords(true) as Coordinates;
      const $next = this.$root.find(nextSelector(key, coordinates))!;
      this.selection?.select($next);
    }
  }
}
