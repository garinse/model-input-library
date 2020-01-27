import { EventEmmiter } from "../event-emmiter.js";

export class NumInput implements EventListenerObject {

  private _parentElement: HTMLElement | null;
  private _controlElement: HTMLDivElement | null;
  private _hostInputElement: HTMLInputElement | null;
  private _value: number | null;
  private _text: string;
  private _isValid: boolean;
  private _timeout: number;

  valueChanged: EventEmmiter<number | null>;
  textChanged: EventEmmiter<string>;
  isValidChanged: EventEmmiter<boolean>;

  constructor(parentElement: HTMLElement) {
    this._parentElement = parentElement;
    this._controlElement = null;
    this._hostInputElement = null;
    this._value = null;
    this._text = '';
    this._isValid = true;
    this._timeout = 0;

    this.valueChanged = new EventEmmiter();
    this.textChanged = new EventEmmiter();
    this.isValidChanged = new EventEmmiter();
  }

  render() {
    if (!this._parentElement) {
      return;
    }
    this._controlElement = document.createElement('div');
    this._controlElement.className = 'nm-control';

    this._hostInputElement = document.createElement('input');
    this._hostInputElement.type = 'text';
    this._hostInputElement.className = 'nm-input';
    this._hostInputElement.addEventListener('input', this);
    this._hostInputElement.addEventListener('change', this);
    this._controlElement.append(this._hostInputElement);

    this._parentElement.innerHTML = '';
    this._parentElement.append(this._controlElement);
  }

  get hostElement(): HTMLElement | null {
    return this._parentElement;
  }

  get value(): number | null | string {
    return this._value;
  }

  set value(v: number | null | string) {
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

  get text(): string {
    return this._text;
  }

  set text(v: string) {
    this._text = v;
    this._hostInputElement && (this._hostInputElement.value = this._text);
    this._hostInputElement?.dispatchEvent(new Event('change'));
    this.textChanged.emmit(this._text);
  }

  get isValid(): boolean {
    return this._isValid;
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
    this._hostInputElement?.removeEventListener('input', this);
    this._hostInputElement?.removeEventListener('change', this);

    this._controlElement = null;
    this._hostInputElement = null;
    if (this._parentElement) {
      this._parentElement.innerHTML = '';
    }
    this._parentElement = null;
  }
}