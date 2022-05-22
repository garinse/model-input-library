import { NumericBase } from "../numeric-base.js";
import { Utils } from "../utils/utils.js";
export class NumInput extends NumericBase {
    constructor(parentElement) {
        super(parentElement);
        this._prefix = 'nm-';
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
        this._parentElement.innerHTML = '';
        this._parentElement.append(this._controlElement);
        (_a = this._hostInputElement) === null || _a === void 0 ? void 0 : _a.addEventListener('input', this);
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
        this.isValidChanged.emit(this._isValid);
    }
    handleEvent(event) {
        if (event.type !== 'input') {
            return;
        }
        const inputVal = event.target.value;
        this.setValue(inputVal, false);
        this.setText(inputVal, false);
        this._isValidUpdate();
    }
    destroy() {
        var _a;
        super.destroy();
        (_a = this._hostInputElement) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbnVtZXJpYy9udW1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sT0FBTyxRQUFTLFNBQVEsV0FBVztJQUl2QyxZQUFZLGFBQTBCO1FBQ3BDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTTs7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQUM7UUFFMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLE9BQU8sQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpELE1BQUEsSUFBSSxDQUFDLGlCQUFpQiwwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzFELENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFNO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsQ0FBUztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTyxjQUFjOztRQUNwQixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3JGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7U0FDakQ7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7U0FDOUM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZO1FBQ3RCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBRUQsTUFBTSxRQUFRLEdBQUksS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBRTFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTzs7UUFDTCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsTUFBQSxJQUFJLENBQUMsaUJBQWlCLDBDQUFFLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDN0QsQ0FBQztDQUNGIn0=