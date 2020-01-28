import { EventEmmiter } from "./event-emmiter.js";
import { Utils } from "./utils/utils.js";

export abstract class NumericBase {
  protected _parentElement: HTMLElement | null;
  protected _controlElement: HTMLDivElement | null;
  protected _hostInputElement: HTMLInputElement | null;
  protected _value: number | null;
  protected _text: string;
  protected _isValid: boolean;
  protected _timeout: number;

  abstract _prefix: string;

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

  abstract render(): void;

  set value(v: any) {
    if (Utils.isNumeric(v)) {
      this.text = v;
    } else {
      this.text = '';
    }
  }

  set text(v: string) {
    this._text = v;
    this._hostInputElement && (this._hostInputElement.value = this._text);
    this._hostInputElement?.dispatchEvent(new Event('input'));
    this.textChanged.emmit(this._text);
  }

  get hostElement(): HTMLElement | null {
    return this._parentElement;
  }

  get value() {
    return this._value;
  }

  get text(): string {
    return this._text;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  protected destroy() {
    this._controlElement = null;
    this._hostInputElement = null;
    this._parentElement && (this._parentElement.innerHTML = '');
    this._parentElement = null;
  }
}