import { EventEmitter } from "./event-emitter.js";
import { Utils } from "./utils/utils.js";

export abstract class NumericBase {
  protected _parentElement: HTMLElement | null;
  protected _controlElement: HTMLDivElement | null;
  protected _hostInputElement: HTMLInputElement | null;
  protected _value: number | null;
  protected _text: string;
  protected _isValid: boolean;
  protected _prefix: string;

  valueChanged: EventEmitter<number | null>;
  textChanged: EventEmitter<string>;
  isValidChanged: EventEmitter<boolean>;

  constructor(parentElement: HTMLElement) {
    this._parentElement = parentElement;
    this._controlElement = null;
    this._hostInputElement = null;
    this._value = null;
    this._text = '';
    this._isValid = true;

    this.valueChanged = new EventEmitter();
    this.textChanged = new EventEmitter();
    this.isValidChanged = new EventEmitter();
  }

  abstract render(): void;

  get hostElement(): HTMLElement | null {
    return this._parentElement;
  }

  get value(): number | null {
    return this._value;
  }

  get text(): string {
    return this._text;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  private updateInput(value: string | null): void {
    this._hostInputElement && (this._hostInputElement.value = value || '');
    this._hostInputElement?.dispatchEvent(new Event('input'));
  }

  private isValidUpdate(): void {
    if (Utils.isNumeric(String(this._value)) || this._value === null && this._text === '') {
      this._isValid = true;
      this._controlElement?.classList.remove('error');
    } else {
      this._isValid = false;
      this._controlElement?.classList.add('error');
    }

    this.isValidChanged.emit(this._isValid);
  }

  setValue(v: string, emitEvent = true): void {
    if (Utils.isNumeric(v)) {
      this._value = parseFloat(v);
      emitEvent && this.updateInput(v);
    } else {
      this._value = null;
      emitEvent && this.updateInput(null);
    }

    this.valueChanged.emit(this._value);
    this.isValidUpdate();
  }

  setText(v: string, emitEvent = true): void {
    this._text = v;
    emitEvent && this.updateInput(v);

    this.textChanged.emit(this._text);
    this.isValidUpdate();
  }

  protected destroy(): void {
    this._controlElement = null;
    this._hostInputElement = null;
    this._parentElement && (this._parentElement.innerHTML = '');
    this._parentElement = null;
  }
}
