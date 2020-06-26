import { DomType } from 'core/dom';

export abstract class DomListener {
  $root: DomType;

  constructor($root: DomType) {
    if (!$root) {
      throw new Error('No root provided for DomListener');
    }
    this.$root = $root;
  }
}
