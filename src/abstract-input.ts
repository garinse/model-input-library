import { EventEmmiter } from "./event-emmiter.js";

export abstract class AbstractInput {
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

  protected render(): void {
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