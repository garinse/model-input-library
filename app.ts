import { NumInput } from './src/numeric/numinput.js';

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
}