import { DomType, $ } from 'core/dom';
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
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      if (!$parent) return;

      const coords = $parent?.getCoordinates();
      if (!coords) return;

      document.onmousemove = (e: MouseEvent) => {
        const deltaX = e.pageX - coords.right;
        const value = coords.width + deltaX;

        if ($parent.element instanceof HTMLElement) {
          $parent.element.style.width = `${value}px`;
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
