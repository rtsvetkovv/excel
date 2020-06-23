interface ExcelOptions {
  components: Array<{}>;
}

export class Excel {
  private $el: Node | null;
  private components: Array<{}>;

  constructor(selector: string, options: ExcelOptions) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }
}
