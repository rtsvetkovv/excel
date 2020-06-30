import { $, DomType, SelectorType } from 'core/dom';

type ComponentType = any; // typeof ExcelComponent & { className: string };

type ExcelOptions = {
  components: Array<ComponentType>;
};

export class Excel {
  private $el: DomType;
  private components: Array<ComponentType> = [];

  constructor(selector: SelectorType, options: ExcelOptions) {
    this.$el = $(selector);
    this.components = options.components;
  }

  private getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);

      const component = new Component($el);
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
}
