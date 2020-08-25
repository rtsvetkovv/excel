import { $, DomType, SelectorType } from 'core/dom';
import { Emitter } from 'core/Emitter';
import { Store } from 'core/store/createStore';
import { ComponentType, ExcelOptions } from 'index';

export class Excel {
  private $el: DomType;
  private components: Array<ComponentType> = [];
  private emitter: Emitter;
  private store: Store;

  constructor(selector: SelectorType, options: ExcelOptions) {
    this.$el = $(selector);
    this.components = options.components;
    this.emitter = new Emitter();
    this.store = options.store;
  }

  private getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);

      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  public render() {
    this.$el?.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }

  public destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
