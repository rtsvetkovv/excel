import { DomListener } from 'core/DomListener';
import { DomType } from 'core/dom';
import { Emitter } from './Emitter';

type Options = { name?: string; listeners?: Array<string>; emitter?: Emitter };

export class ExcelComponent extends DomListener {
  public emitter?: Emitter;

  constructor($root: DomType, options: Options = {}) {
    super($root, options.listeners);
    this.name = options.name ?? '';
    this.emitter = options.emitter;

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
