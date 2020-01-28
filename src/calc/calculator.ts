import { Utils } from "../utils/utils.js";

export class Calculator {

  private operators: { [key: string]: { priority: number } } = {
    "^": {
      priority: 4
    },
    "/": {
      priority: 3
    },
    "*": {
      priority: 3
    },
    "+": {
      priority: 2
    },
    "-": {
      priority: 2
    }
  }

  /**
   * Calculating result of arifmetic string
   * @param {string} value arifmetic string
   * @returns {number | Error} result or error
   */
  calc(value: string): number | Error {
    if (!value) {
      return new Error('Invalid incoming string');
    }

    const opn = this.convertToRpn(value);
    if (opn instanceof Error) {
      return opn;
    }

    return this.calcRpn(opn);
  }

  /**
   * Parsing a string and converting to reverse polish notation
   * @param {string} value
   * @returns {string[] | Error} array rpn or error
   */
  convertToRpn(value: string): string[] | Error {

    const stack: string[] = [];
    const out: string[] = [];

    value = value.replace(/\s+/g, "").replace(',', '.');
    // add null, ex: (-23+2) => (0-23+2) 
    value = value.replace(/\(([\+\-])/g, "(0$1");
    const valueArr = value.split(/([\+\-\*\/\^\(\)])/).filter(v => v);
    // add null, ex: -1+5 => 0-1+5
    if (valueArr.length > 0 && '-+'.indexOf(valueArr[0]) !== -1) {
      valueArr.unshift('0');
    }

    for (let i = 0; i < valueArr.length; i++) {
      const element = valueArr[i];

      if (Utils.isNumeric(element)) {
        out.push(element);
      } else if (this.operators.hasOwnProperty(element)) {

        let lastOperator = stack[stack.length - 1];
        const currOperator = element;

        while (this.operators.hasOwnProperty(lastOperator)
          && this.operators[lastOperator].priority >= this.operators[currOperator].priority) {
          const last = stack.pop();
          if (last) {
            out.push(last);
          }
          lastOperator = stack[stack.length - 1];
        }

        stack.push(currOperator);
      } else if (element === '(') {
        stack.push(element);
      } else if (element === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          const lastOperator = stack.pop();
          if (lastOperator) {
            out.push(lastOperator);
          }
        }

        if (stack.length > 0 && stack[stack.length - 1] === '(') {
          stack.pop();
        } else {
          return new Error('Invalid incoming expression');
        }
      } else {
        return new Error('Invalid incoming expression');
      }
    }

    while (stack.length > 0) {
      const lastInStackOperator = stack.pop();
      if (lastInStackOperator && this.operators.hasOwnProperty(lastInStackOperator)) {
        out.push(lastInStackOperator);
      } else {
        return new Error('Invalid incoming expression');
      }

    }

    return out;
  }

  /**
   * Calculating result of rpn array
   * @param {string[]} array 
   * @returns {number | Error} calc result or error
   */
  calcRpn(arr: string[]): number | Error {
    const resultArr: any[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (Utils.isNumeric(arr[i])) {
        resultArr.push(arr[i]);
      } else {
        const a = resultArr.pop();
        const b = resultArr.pop();

        if (arr[i] === '+') {
          resultArr.push(parseFloat(a) + parseFloat(b));
        } else if (arr[i] === '-') {
          resultArr.push(parseFloat(b) - parseFloat(a));
        } else if (arr[i] === '*') {
          resultArr.push(parseFloat(a) * parseFloat(b));
        } else if (arr[i] === '/') {
          resultArr.push(parseFloat(b) / parseFloat(a));
        } else if (arr[i] === '^') {
          resultArr.push(Math.pow(parseFloat(b), parseFloat(a)));
        }
      }
    }

    if (resultArr.length > 1) {
      return new Error('Postfix calculation error');
    }

    let result = resultArr[0];

    if (Utils.isNumeric(result)) {
      if (!Number.isInteger(result)) {
        // result = Number(parseFloat(result).toFixed(2));
      }
    } else {
      result = new Error('Postfix calculation error');
    }

    return result;
  }
}