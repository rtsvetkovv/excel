import { DomType } from 'core/dom';

export abstract class DomListener {
  $root: DomType;
  private listeners = [];

  constructor($root: DomType, listeners = []) {
    if (!$root) {
      throw new Error('No root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log(this.listeners);
  }

  removeDOMListeners() {
  }
}
