export abstract class DomListener {
  $root: HTMLElement;

  constructor($root: HTMLElement) {
    if (!$root) {
      throw new Error('No root provided for DomListener');
    }
    this.$root = $root;
  }
}
