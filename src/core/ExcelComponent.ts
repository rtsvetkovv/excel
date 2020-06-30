import { DomListener } from 'core/DomListener';
import { DomType } from 'core/dom';

export class ExcelComponent extends DomListener {
  constructor($root: DomType, options: any = {}) {
    super($root, options.listeners);
  }
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
