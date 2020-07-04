import { DomType } from 'core/dom';
import { capitalize } from 'core/utils';

export class DomListener {
  public $root: DomType;
  public name: string = '';
  private listeners: Array<string> = [];

  constructor($root: DomType, listeners = []) {
    if (!$root) {
      throw new Error('No root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log('HEre');
    this.listeners.forEach((eventName) => {
      const method = getMethodName(eventName);
      const listener = (this as any)[method];

      if (!listener) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} component`
        );
      }

      this.$root.on(eventName, listener.bind(this));
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((eventName) => {
      const method = getMethodName(eventName);
      const listener = (this as any)[method];

      this.$root.clear(eventName, listener);
    });
  }
}

const getMethodName = (eventName: string) => 'on' + capitalize(eventName);
