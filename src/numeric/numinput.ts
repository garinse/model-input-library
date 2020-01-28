import { AbstractInput } from "../abstract-input.js";

export class NumInput extends AbstractInput implements EventListenerObject {

  _prefix: string;

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
    if (this.isNumeric(v)) {
      this.text = v;
    } else {
      this.text = '';
    }
  }

  private _setValue(v: any) {
    console.log('_setValue', v, this._value);
    if (this.isNumeric(v)) {
      this._value = parseFloat(v);
    } else {
      this._value = null;
    }
    this._isValidUpdate();
    this.valueChanged.emmit(this._value);
  }

  set text(v: string) {
    this._text = v;
    this._hostInputElement && (this._hostInputElement.value = this._text);
    this._hostInputElement?.dispatchEvent(new Event('input'));
    this.textChanged.emmit(this._text);
  }

  private _isValidUpdate() {
    if (this._value === null && this._text === '' || !isNaN(parseFloat(String(this._value)))) {
      this._isValid = true;
      this._controlElement?.classList.remove('error');
    } else {
      this._isValid = false;
      this._controlElement?.classList.add('error');
    }

    this.isValidChanged.emmit(this._isValid);
  }

  handleEvent(event: Event): void {
    if (event.type === 'input') {
      const newValue = (event.target as HTMLInputElement).value;

      this._text = newValue;
      this.textChanged.emmit(this._text);

      this._setValue(newValue);
    }
  }

  destroy() {
    super.destroy();
    this._hostInputElement?.removeEventListener('input', this);
  }
}