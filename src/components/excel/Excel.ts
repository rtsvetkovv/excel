import { ExcelComponent } from 'core/ExcelComponent';
import { $ } from 'core/dom';

type ComponentType = typeof ExcelComponent & { className: string };

interface IExcelOptions {
  components: Array<ComponentType>;
}

export class Excel {
  private $el: HTMLElement | null;
  private components: Array<ComponentType>;

  constructor(selector: string, options: IExcelOptions) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  private getRoot() {
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className);

      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });

    return $root;
  }

  public render() {
    this.$el?.append(this.getRoot());
  }
}
