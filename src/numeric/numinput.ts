import { AbstractInput } from "../abstract-input.js";

export class NumInput extends AbstractInput implements EventListenerObject {

  _prefix: string;

  constructor(parentElement: HTMLElement) {
    super(parentElement);
    this._prefix = 'nm-';
  }

  render() {
    super.render();
    this._hostInputElement?.addEventListener('input', this);
    this._hostInputElement?.addEventListener('change', this);
  }

  set value(v: any) {
    this._setValue(v);

    if (this._isValid) {
      this.text = String(v)
    } else {
      this.text = '';
    } 
  }

  private _setValue(value: any) {
    if (value !== '' && !isNaN(parseFloat(value)) && isFinite(+value)) {
      this._value = parseFloat(value);
    } else {
      this._value = null;
    }
    this.valueChanged.emmit(this._value);
    this._isValidUpdate();
  }

  set text(v: string) {
    this._text = v;
    this._hostInputElement && (this._hostInputElement.value = this._text);
    this._hostInputElement?.dispatchEvent(new Event('change'));
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
    switch (event.type) {
      case 'input':
        this._text = (event.target as HTMLInputElement).value;
        this.textChanged.emmit(this._text);
        this._setValue(this._text);
        break;
      case 'change':
        this._setValue(this._text);
    }
  }

  destroy() {
    super.destroy();
    this._hostInputElement?.removeEventListener('input', this);
    this._hostInputElement?.removeEventListener('change', this);
  }
}