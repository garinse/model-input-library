import { NumInput } from './src/numeric/numinput.js';
import { CalcInput } from './src/calc/calcinput.js';
window.onload = () => {
    /*
    * Numeric component example
    */
    const numContainer = document.getElementById('numInput');
    if (numContainer) {
        const numComponent = new NumInput(numContainer);
        numComponent.render();
        const numValue = document.querySelector('.num-info .info__value');
        if (numValue) {
            numComponent.valueChanged.subscribe((value) => {
                numValue.textContent = String(value);
            });
        }
        const numInputText = document.querySelector('.num-info .info__text');
        if (numInputText) {
            numComponent.textChanged.subscribe((value) => {
                numInputText.textContent = value;
            });
        }
        const numValid = document.querySelector('.num-info .info__valid');
        if (numValid) {
            numComponent.isValidChanged.subscribe((value) => {
                numValid.textContent = String(value);
            });
        }
        const inputValue = document.querySelector('.num-control .input-value');
        const buttonValue = document.querySelector('.num-control .button-value');
        if (buttonValue) {
            buttonValue.onclick = () => {
                var _a;
                numComponent.value = String((_a = inputValue) === null || _a === void 0 ? void 0 : _a.value);
            };
        }
        const inputText = document.querySelector('.num-control .input-text');
        const buttonText = document.querySelector('.num-control .button-text');
        if (buttonText) {
            buttonText.onclick = () => {
                var _a;
                numComponent.text = String((_a = inputText) === null || _a === void 0 ? void 0 : _a.value);
            };
        }
    }
    /*
    * Calc component example
    */
    const calcContainer = document.getElementById('calcInput');
    if (calcContainer) {
        const calcInput = new CalcInput(calcContainer);
        calcInput.render();
        const calcValue = document.querySelector('.calc-info .info__value');
        if (calcValue) {
            calcInput.valueChanged.subscribe((value) => {
                calcValue.textContent = value ? String(value) : '';
            });
        }
        const calcInputText = document.querySelector('.calc-info .info__text');
        if (calcInputText) {
            calcInput.textChanged.subscribe((value) => {
                calcInputText.textContent = value;
            });
        }
        const calcValid = document.querySelector('.calc-info .info__valid');
        if (calcValid) {
            calcInput.isValidChanged.subscribe((value) => {
                calcValid.textContent = String(value);
            });
        }
        const inputValue = document.querySelector('.calc-control .input-value');
        const buttonValue = document.querySelector('.calc-control .button-value');
        if (buttonValue) {
            buttonValue.onclick = () => {
                var _a;
                calcInput.value = String((_a = inputValue) === null || _a === void 0 ? void 0 : _a.value);
            };
        }
        const inputText = document.querySelector('.calc-control .input-text');
        const buttonText = document.querySelector('.calc-control .button-text');
        if (buttonText) {
            buttonText.onclick = () => {
                var _a;
                calcInput.text = String((_a = inputText) === null || _a === void 0 ? void 0 : _a.value);
            };
        }
    }
    /*
     * Removing all component
     */
    const numDefaultContainer = document.getElementById('numInputCustom');
    const calcDefaultContainer = document.getElementById('calcInputCustom');
    let numInputDefault = null;
    let calcInputDefault = null;
    if (numDefaultContainer) {
        numInputDefault = new NumInput(numDefaultContainer);
        numInputDefault.render();
    }
    if (calcDefaultContainer) {
        calcInputDefault = new CalcInput(calcDefaultContainer);
        calcInputDefault.render();
    }
    const destroyCalcButton = document.getElementById('destroyButton');
    if (destroyCalcButton) {
        destroyCalcButton.onclick = () => {
            var _a, _b;
            (_a = numInputDefault) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = calcInputDefault) === null || _b === void 0 ? void 0 : _b.destroy();
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkI7O01BRUU7SUFDRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELElBQUksWUFBWSxFQUFFO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV0QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM1QyxRQUFRLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksWUFBWSxFQUFFO1lBQ2hCLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzNDLFlBQVksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMs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