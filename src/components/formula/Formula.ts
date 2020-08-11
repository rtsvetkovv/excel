import { ExcelComponent } from 'core/ExcelComponent';
import { DomType } from 'core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root: DomType, options: any) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e: KeyboardEvent) {
    const text = (e.target as HTMLElement).textContent!.trim();
    this.$emit('formula:input', text);
  }
}
