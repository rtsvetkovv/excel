import { DomListener } from 'core/DomListener';
import { DomType } from 'core/dom';

export class ExcelComponent extends DomListener {
  constructor(
    $root: DomType,
    options: { name: string; listeners: Array<string> } = {
      name: '',
      listeners: [],
    }
  ) {
    super($root, options.listeners);
    this.name = options.name;

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
