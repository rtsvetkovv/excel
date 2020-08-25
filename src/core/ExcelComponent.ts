import { DomListener } from 'core/DomListener';
import { DomType } from 'core/dom';
import { Emitter } from './Emitter';
import { Store } from './store/createStore';
import { ExcelOptions } from 'index';

export class ExcelComponent extends DomListener {
  public emitter?: Emitter;
  public store: Store;
  private unsubscribers: Array<Function> = [];
  private storeSub?: { unsubscribe: Function };

  constructor($root: DomType, options: ExcelOptions) {
    super($root, options.listeners);
    this.name = options.name ?? '';
    this.emitter = options.emitter;
    this.store = options.store;

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

  $dispatch(action: { type: string; payload?: any }) {
    this.store.dispatch(action);
  }

  $subscribe(fn: Function) {
    this.storeSub = this.store.subscribe(fn);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscribeFn) => unsubscribeFn());
    this.storeSub?.unsubscribe();
  }
}
