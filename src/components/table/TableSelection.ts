import { DomType } from 'core/dom';

export class TableSelection {
  constructor(private group: Array<DomType> = []) {}

  select(element: DomType) {
    this.clear();
    this.group.push(element);
    element.addClass('selected');
  }

  selectGroup() {}

  clear() {
    this.group.forEach(($el) => $el.removeClass('selected'));
    this.group.length = 0;
  }
}
