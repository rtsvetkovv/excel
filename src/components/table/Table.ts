import { DomType } from 'core/dom';
import { ExcelComponent } from 'core/ExcelComponent';
import { createTable } from './table.template';

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
    if (event.target instanceof HTMLElement && event.target.dataset.resize) {
      console.log('event.target.dataset.resize', event.target.dataset.resize);
    }
  }
}
