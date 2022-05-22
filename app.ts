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

    const inputValue: HTMLInputElement | null = document.querySelector('.num-control .input-value');
    const buttonValue: HTMLButtonElement | null = document.querySelector('.num-control .button-value');
    if (buttonValue) {
      buttonValue.onclick = () => {
        numComponent.value = String(inputValue?.value);
      }
    }

    const inputText: HTMLInputElement | null = document.querySelector('.num-control .input-text');
    const buttonText: HTMLButtonElement | null = document.querySelector('.num-control .button-text');
    if (buttonText) {
      buttonText.onclick = () => {
        numComponent.text = String(inputText?.value);

      }
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

   const inputValue: HTMLInputElement | null = document.querySelector('.calc-control .input-value');
   const buttonValue: HTMLButtonElement | null = document.querySelector('.calc-control .button-value');
   if (buttonValue) {
     buttonValue.onclick = () => {
       calcInput.value = String(inputValue?.value);
     }
   }

   const inputText: HTMLInputElement | null = document.querySelector('.calc-control .input-text');
   const buttonText: HTMLButtonElement | null = document.querySelector('.calc-control .button-text');
   if (buttonText) {
     buttonText.onclick = () => {
       calcInput.text = String(inputText?.value);
     }
   }
 }

 /* 
  * Removing all component 
  */
 const numDefaultContainer = document.getElementById('numInputCustom');
 const calcDefaultContainer = document.getElementById('calcInputCustom');

 let numInputDefault: NumInput | null = null;
 let calcInputDefault: CalcInput | null = null;

 if (numDefaultContainer) {
   numInputDefault = new NumInput(numDefaultContainer);
   numInputDefault.render();
 }

 if (calcDefaultContainer) {
   calcInputDefault = new CalcInput(calcDefaultContainer);
   calcInputDefault.render();
 }

 const destroyCalcButton: HTMLElement | null = document.getElementById('destroyButton');
 if (destroyCalcButton) {
   destroyCalcButton.onclick = () => {
     numInputDefault?.destroy();
     calcInputDefault?.destroy();
   }
 }
}
