import { NumericBase } from "../numeric-base.js";
import { Calculator } from "./calculator.js";
import { Utils } from "../utils/utils.js";
export class CalcInput extends NumericBase {
    constructor(parentElement) {
        super(parentElement);
        this._prefix = 'cl-';
        this._error = '';
        this._hostResultElement = null;
        this._calculator = new Calculator();
    }
    render() {
        var _a;
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
        (_a = this._hostInputElement) === null || _a === void 0 ? void 0 : _a.addEventListener('input', this);
    }
    get error() {
        return this._error;
    }
    _setValue(v) {
        if (Utils.isNumeric(v)) {
            this._value = parseFloat(v);
        }
        else {
            this._value = null;
        }
        this._isValidUpdate();
        this.valueChanged.emmit(this._value);
        this._resultUpdate();
    }
    _isValidUpdate() {
        var _a, _b;
        if (Utils.isNumeric(String(this._value)) || this._value === null && this._text === '') {
            this._isValid = true;
            (_a = this._controlElement) === null || _a === void 0 ? void 0 : _a.classList.remove('error');
        }
        else {
            this._isValid = false;
            (_b = this._controlElement) === null || _b === void 0 ? void 0 : _b.classList.add('error');
        }
        this.isValidChanged.emmit(this._isValid);
    }
    _resultUpdate() {
        if (!this._hostResultElement) {
            return;
        }
        if (this._isValid && this._value === null) {
            this._hostResultElement.innerText = '';
        }
        else if (this._isValid && this._value !== null) {
            this._hostResultElement.innerText = String(this._value);
        }
        else {
            this._hostResultElement.innerText = '?';
        }
    }
    handleEvent(event) {
        if (event.type === 'input') {
            this._text = event.target.value;
            this.textChanged.emmit(this._text);
            this.calculation();
        }
    }
    calculation() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        new Promise((resolve, reject) => {
            this._timeout = setTimeout(() => {
                const result = this._calculator.calc(this._text);
                if (result instanceof Error) {
                    reject(result);
                }
                else {
                    resolve(result);
                }
            }, 300);
        })
            .then((s) => {
            this._setValue(s);
            this._error = '';
        })
            .catch((s) => {
            this._setValue(null);
            this._error = s.message;
        });
    }
    destroy() {
        var _a;
        super.destroy();
        (_a = this._hostInputElement) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY2lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NhbGMvY2FsY2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sT0FBTyxTQUFVLFNBQVEsV0FBVztJQU94QyxZQUFZLGFBQTBCO1FBQ3BDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQUM7UUFFMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLE9BQU8sQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJ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