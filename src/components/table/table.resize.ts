import { DomType, $ } from 'core/dom';

export const handleResize = ($root: DomType, event: MouseEvent) => {
  return new Promise((resolve) => {
    if (!(event.target instanceof HTMLElement)) return;

    const $resizer = $(event.target);
    const type = $resizer.data?.resize;
    let value: number;
    if (!type) return;

    const $parent = $resizer.closest('[data-type="resizable"]');
    if (!$parent) return;

    const coords = $parent?.getCoordinates();
    if (!coords) return;

    if (!($parent.element instanceof HTMLElement)) return;
    const isColumn = type === 'col';

    const direction = isColumn ? 'bottom' : 'right';

    $resizer.css({
      opacity: 1,
      [direction]: '-5000px',
    });

    document.onmousemove = (e: MouseEvent) => {
      if (isColumn) {
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

      if (isColumn) {
        $parent.css({ width: `${value}px` });

        const index = $parent.data?.index;
        const cells = $root.findAll(`[data-collindex="${index}"]`) as NodeListOf<HTMLElement>;

        cells.forEach((cell) => {
          if (!(cell instanceof HTMLElement)) return;
          cell.style.width = `${value}px`;
        });
      } else {
        $parent.css({ height: `${value}px` });
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data!.index : null,
      });

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0,
      });
    };
  });
};
