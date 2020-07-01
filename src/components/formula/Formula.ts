import { ExcelComponent } from 'core/ExcelComponent';
import { DomType } from 'core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: DomType) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e: Event) {
    console.log(this.$root);
    console.log('Formula on input: ', e);
  }

  onClick() {
    console.log('Hello');
  }
}
