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
      const type = $resizer.data?.resize;
      if (!type) return;

      const $parent = $resizer.closest('[data-type="resizable"]');
      if (!$parent) return;

      const coords = $parent?.getCoordinates();
      if (!coords) return;

      if (!($parent.element instanceof HTMLElement)) return;

      const index = $parent.data?.index;
      const cells = this.$root.findAll(`[data-collindex="${index}"]`) as NodeListOf<HTMLElement>;

      document.onmousemove = (e: MouseEvent) => {
        if (type === 'col') {
          const deltaX = e.pageX - coords.right;
          const value = coords.width + deltaX;

          if (!($parent.element instanceof HTMLElement)) return;

          $parent.css({ width: `${value}px` });

          cells.forEach((cell) => {
            if (!(cell instanceof HTMLElement)) return;
            cell.style.width = `${value}px`;
          });
        } else {
          const deltaY = e.pageY - coords.bottom;
          const value = String(coords.height + deltaY);

          $parent.css({ height: `${value}px` });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
