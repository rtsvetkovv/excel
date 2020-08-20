import { ExcelComponent } from 'core/ExcelComponent';
import { DomType, $ } from 'core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  $formula?: DomType;

  constructor($root: DomType, options: any) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula')!;

    this.$on('table:select', ($cell: DomType) => {
      this.$formula!.text($cell.text());
    });

    this.$on('table:input', ($cell: DomType) => {
      this.$formula!.text($cell.text());
    });

    this.$subscribe((state: any) => {
      console.log('Formula state, ', state);
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e: KeyboardEvent) {
    const text = $(e.target as HTMLElement).text();

    this.$emit('formula:input', text);
  }

  onKeydown(e: KeyboardEvent) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(e.key)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
}
