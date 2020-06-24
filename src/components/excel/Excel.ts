import { ExcelComponent } from "core/ExcelComponent";

interface ExcelOptions {
  components: Array<typeof ExcelComponent>;
}

export class Excel {
  private $el: HTMLElement | null;
  private components: Array<typeof ExcelComponent>;

  constructor(selector: string, options: ExcelOptions) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  private getRoot() {
    const $root = document.createElement("div");
    this.components.forEach((Component) => {
      const component = new Component();
      $root.insertAdjacentHTML("beforeend", component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el?.append(this.getRoot());
  }
}
