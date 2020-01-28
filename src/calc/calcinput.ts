import { NumericBase } from "../numeric-base.js";
import { Calculator } from "./calculator.js";
import { Utils } from "../utils/utils.js";

export class CalcInput extends NumericBase implements EventListenerObject {

  private _prefix: string;
  private _calculator: Calculator;
  private _error: string;
  private _hostResultElement: HTMLSpanElement | null;

  constructor(parentElement: HTMLElement) {
    super(parentElement);
    this._prefix = 'cl-';
    this._error = '';

    this._hostResultElement = null;
    this._calculator = new Calculator();
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

    this._hostResultElement = document.createElement('span');
    this._hostResultElement.className = `${this._prefix}result`;
    this._controlElement.append(this._hostResultElement);

    this._parentElement.innerHTML = '';
    this._parentElement.append(this._controlElement);

    this._hostInputElement?.addEventListener('input', this);
  }

  get error() {
    return this._error;
  }

  private _setValue(v: any) {
    if (Utils.isNumeric(v)) {
      this._value = parseFloat(v);
    } else {
      this._value = null;
    }
    this._isValidUpdate();
    this.valueChanged.emmit(this._value);
    this._resultUpdate();
  }

  private _isValidUpdate() {
    if (Utils.isNumeric(String(this._value)) || this._value === null && this._text === '') {
      this._isValid = true;
      this._controlElement?.classList.remove('error');
    } else {
      this._isValid = false;
      this._controlElement?.classList.add('error');
    }

    this.isValidChanged.emmit(this._isValid);
  }

  private _resultUpdate() {
    if (!this._hostResultElement) {
      return;
    }
    if (this._isValid && this._value === null) {
      this._hostResultElement.innerText = '';
    } else if (this._isValid && this._value !== null) {
      this._hostResultElement.innerText = String(this._value);
    } else {
      this._hostResultElement.innerText = '?';
    }
  }

  handleEvent(event: Event): void {
    if (event.type === 'input') {
      this._text = (event.target as HTMLInputElement).value;
      this.textChanged.emmit(this._text);
      this.calculation();
    }
  }

  private calculation() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    new Promise<number>((resolve, reject) => {
      this._timeout = setTimeout(() => {
        const result: any = this._calculator.calc(this._text);
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result);
        }
      }, 300);
    })
    .then((s: number) => {
      this._setValue(s);
      this._error = '';
    })
    .catch((s: Error) => {
      this._setValue(null);
      this._error = s.message;
    });
  }

  destroy() {
    super.destroy();
    this._hostInputElement?.removeEventListener('input', this);
  }
}