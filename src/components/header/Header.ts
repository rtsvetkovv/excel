import { ExcelComponent } from 'core/ExcelComponent';
import { DomType } from 'core/dom';
import { ExcelOptions } from 'index';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: DomType, options: ExcelOptions) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `
       <input type="text" class="input" value="Новая таблица" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `;
  }
}
