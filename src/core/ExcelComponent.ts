import { DomListener } from 'core/DomListener';
import { DomType } from 'core/dom';
import { Emitter } from './Emitter';

type Options = { name?: string; listeners?: Array<string>; emitter?: Emitter };

export class ExcelComponent extends DomListener {
  public emitter?: Emitter;
  private unsubscribers: Array<Function> = [];

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

  $emit(event: string, ...args: any[]) {
    this.emitter?.emit(event, ...args);
  }

  $on(event: string, listener: Function) {
    const unsubscribeFn = this.emitter?.subscribe(event, listener);
    if (!unsubscribeFn) return;

    this.unsubscribers.push(unsubscribeFn);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscribeFn) => unsubscribeFn());
  }
}
