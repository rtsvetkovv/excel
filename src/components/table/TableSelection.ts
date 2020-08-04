import { DomType } from 'core/dom';

export class TableSelection {
  static className = 'selected';
  constructor(private group: Array<DomType> = [], public current: DomType | null = null) {}

  select($element: DomType) {
    this.clear();
    this.group.push($element);
    this.current = $element;
    $element.addClass(TableSelection.className);
  }

  selectGroup(group: Array<DomType> = []) {
    this.clear();
    this.group = group;

    this.group.forEach(($group) => $group.addClass(TableSelection.className));
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group.length = 0;
  }
}
