import { $, DomType, SelectorType } from 'core/dom';
import { Emitter } from 'core/Emitter';

type ComponentType = any; // typeof ExcelComponent & { className: string };

type ExcelOptions = {
  components: Array<ComponentType>;
};

export class Excel {
  private $el: DomType;
  private components: Array<ComponentType> = [];
  private emitter: Emitter;

  constructor(selector: SelectorType, options: ExcelOptions) {
    this.$el = $(selector);
    this.components = options.components;
    this.emitter = new Emitter();
  }

  private getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
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
