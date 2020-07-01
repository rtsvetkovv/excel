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
    this.listeners.forEach((eventName) => {
      const method = getMethodName(eventName);
      // @ts-ignore
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} component`
        );
      }
      // @ts-ignore
      this.$root.on(eventName, this[method]?.bind(this));
    });
  }

  removeDOMListeners() {}
}

const getMethodName = (eventName: string) => 'on' + capitalize(eventName);
