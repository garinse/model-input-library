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
    set value(v) {
        this.setValue(v);
    }
    set text(v) {
        this.setText(v);
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
        if (event.type !== 'input') {
            return;
        }
        const inputVal = event.target.value;
        this.setText(inputVal, false);
        this.calculation();
    }
    calculation() {
        try {
            const result = this._calculator.calc(this._text);
            this.setValue(result, false);
            this._isValidUpdate();
            this._resultUpdate();
            this._error = '';
        }
        catch (e) {
            this.setValue(null, false);
            this._isValidUpdate();
            this._resultUpdate();
            this._error = e.message;
        }
    }
    destroy() {
        var _a;
        super.destroy();
        (_a = this._hostInputElement) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY2lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NhbGMvY2FsY2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sT0FBTyxTQUFVLFNBQVEsV0FBVztJQU94QyxZQUFZLGFBQTBCO1FBQ3BDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQUM7UUFFMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLE9BQU8sQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJ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