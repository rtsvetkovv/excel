import { DomType } from 'core/dom';
import { capitalize } from 'core/utils';

export class DomListener {
  public $root: DomType;
  public name: string = '';
  private listeners: Array<string> = [];

  constructor($root: DomType, listeners: Array<string> = []) {
    if (!$root) {
      throw new Error('No root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((eventName) => {
      const methodName = getMethodName(eventName);
      let method = (this as any)[methodName];
      if (!method) {
        throw new Error(`Method ${methodName} is not implemented in ${this.name} component`);
      }
      const listener = (method = (this as any)[methodName].bind(this));

      this.$root.on(eventName, listener);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((eventName) => {
      const methodName = getMethodName(eventName);
      const listener = (this as any)[methodName];

      this.$root.of(eventName, listener);
    });
  }
}

const getMethodName = (eventName: string) => 'on' + capitalize(eventName);
