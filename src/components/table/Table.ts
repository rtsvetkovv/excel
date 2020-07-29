import { DomType, $ } from 'core/dom';
import { ExcelComponent } from 'core/ExcelComponent';
import { createTable } from './table.template';
import { handleResize } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  selection?: TableSelection;

  constructor($root: DomType) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click'],
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

    const coords = $(event.target).data?.coords;

    if (!coords) return;

    const $cell = this.$root.find(`[data-coords="${coords}"]`);
    if (!$cell) return;

    this.selection?.select($cell);
  }
}
