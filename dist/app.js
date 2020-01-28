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
                numValue.innerHTML = String(value);
            });
        }
        const numInputText = document.querySelector('.num-info .info__text');
        if (numInputText) {
            const subs = numComponent.textChanged.subscribe((value) => {
                numInputText.innerHTML = value;
            });
            // setTimeout(() => subs.unsubscribe(), 3000);
        }
        const numValid = document.querySelector('.num-info .info__valid');
        if (numValid) {
            const subs = numComponent.isValidChanged.subscribe((value) => {
                numValid.innerHTML = String(value);
            });
            // setTimeout(() => subs.unsubscribe(), 3000);
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
                calcValue.innerHTML = value ? String(value) : '';
            });
        }
        const calcInputText = document.querySelector('.calc-info .info__text');
        if (calcInputText) {
            calcInput.textChanged.subscribe((value) => {
                calcInputText.innerHTML = value;
            });
        }
        const calcValid = document.querySelector('.calc-info .info__valid');
        if (calcValid) {
            const subs = calcInput.isValidChanged.subscribe((value) => {
                calcValid.innerHTML = String(value);
            });
            // setTimeout(() => subs.unsubscribe(), 3000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkI7O01BRUU7SUFDRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELElBQUksWUFBWSxFQUFFO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV0QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEVBQUU7WUFDWixZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM1QyxRQUFRLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELFlBQVksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsOENBQThDO1NBQy9DO1FBRUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxFQUFFO1lB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