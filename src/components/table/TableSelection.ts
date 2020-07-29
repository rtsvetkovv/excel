import { DomType } from 'core/dom';

export class TableSelection {
  constructor(private group: Array<DomType> = []) {}

  select(element: DomType) {
    this.group.push(element);
    element.addClass('selected');
  }

  selectGroup() {}
}
