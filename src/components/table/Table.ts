import { DomType } from 'core/dom';
import { ExcelComponent } from 'core/ExcelComponent';
import { createTable } from './table.template';
import { handleResize } from './table.resize';
import { shouldResize } from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root: DomType) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
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
}
