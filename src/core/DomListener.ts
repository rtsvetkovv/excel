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
      const method = getMethodName(eventName);
      const listener = ((this as any)[method] = (this as any)[method].bind(
        this
      ));

      if (!listener) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} component`
        );
      }

      this.$root.on(eventName, listener);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((eventName) => {
      const method = getMethodName(eventName);
      const listener = (this as any)[method];

      this.$root.of(eventName, listener);
    });
  }
}

const getMethodName = (eventName: string) => 'on' + capitalize(eventName);
