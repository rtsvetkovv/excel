import { ExcelComponent } from 'core/ExcelComponent';
import { DomType } from 'core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: DomType) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e: any) {
    console.log('Formula on input: ', e);
  }
}
