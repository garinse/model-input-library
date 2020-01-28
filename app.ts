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
     // calcValid.innerHTML = String(calcInput.isValid);
     const subs = calcInput.isValidChanged.subscribe((value) => {
       calcValid.innerHTML = String(value);
     });
     // setTimeout(() => subs.unsubscribe(), 3000);
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
}