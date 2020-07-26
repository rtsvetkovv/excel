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
      let value: number;
      if (!type) return;

      const $parent = $resizer.closest('[data-type="resizable"]');
      if (!$parent) return;

      const coords = $parent?.getCoordinates();
      if (!coords) return;

      if (!($parent.element instanceof HTMLElement)) return;

      const direction = type === 'col' ? 'bottom' : 'right';

      $resizer.css({
        opacity: 1,
        [direction]: '-5000px',
      });

      document.onmousemove = (e: MouseEvent) => {
        if (type === 'col') {
          const deltaX = e.pageX - coords.right;
          value = coords.width + deltaX;

          $resizer.css({
            right: `${-deltaX}px`,
          });
        } else {
          const deltaY = e.pageY - coords.bottom;
          value = coords.height + deltaY;

          $resizer.css({
            bottom: `${-deltaY}px`,
          });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
          $parent.css({ width: `${value}px` });

          const index = $parent.data?.index;
          const cells = this.$root.findAll(`[data-collindex="${index}"]`) as NodeListOf<
            HTMLElement
          >;

          cells.forEach((cell) => {
            if (!(cell instanceof HTMLElement)) return;
            cell.style.width = `${value}px`;
          });
        } else {
          $parent.css({ height: `${value}px` });
        }

        $resizer.css({
          opacity: 0,
          right: 0,
          bottom: 0,
        });
      };
    }
  }
}
