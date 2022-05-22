import { NumericBase } from "../numeric-base.js";
import { Utils } from "../utils/utils.js";

export class NumInput extends NumericBase implements EventListenerObject {

  private _prefix: string;

  constructor(parentElement: HTMLElement) {
    super(parentElement);
    this._prefix = 'nm-';
  }

  render() {
    if (!this._parentElement) {
      return;
    }
    this._controlElement = document.createElement('div');
    this._controlElement.className = `${this._prefix}control`;

    this._hostInputElement = document.createElement('input');
    this._hostInputElement.type = 'text';
    this._hostInputElement.className = `${this._prefix}input`;
    this._controlElement.append(this._hostInputElement);

    this._parentElement.innerHTML = '';
    this._parentElement.append(this._controlElement);

    this._hostInputElement?.addEventListener('input', this);
  }

  set value(v: any) {
    this.setValue(v);
  }

  set text(v: string) {
    this.setText(v);
  }

  private _isValidUpdate() {
    if (Utils.isNumeric(String(this._value)) || this._value === null && this._text === '') {
      this._isValid = true;
      this._controlElement?.classList.remove('error');
    } else {
      this._isValid = false;
      this._controlElement?.classList.add('error');
    }

    this.isValidChanged.emit(this._isValid);
  }

  handleEvent(event: Event): void {
    if (event.type !== 'input') {
      return;
    }

    const inputVal = (event.target as HTMLInputElement).value;

    this.setValue(inputVal, false);
    this.setText(inputVal, false);
    this._isValidUpdate();
  }

  destroy() {
    super.destroy();
    this._hostInputElement?.removeEventListener('input', this);
  }
}
