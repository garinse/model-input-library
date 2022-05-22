import { Utils } from "../utils/utils.js";
export class Calculator {
    constructor() {
        this.operators = {
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
        };
    }
    /**
     * Calculating result of arifmetic string
     * @param {string} value arifmetic string
     * @returns {number} result
     */
    calc(value) {
        if (!value) {
            throw Error('Invalid incoming string');
        }
        const opn = this.convertToRpn(value);
        return this.calcRpn(opn);
    }
    /**
     * Parsing a string and converting to reverse polish notation
     * @param {string} value
     * @returns {string[]} array rpn
     */
    convertToRpn(value) {
        const stack = [];
        const out = [];
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
            }
            else if (this.operators.hasOwnProperty(element)) {
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
            }
            else if (element === '(') {
                stack.push(element);
            }
            else if (element === ')') {
                while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    const lastOperator = stack.pop();
                    if (lastOperator) {
                        out.push(lastOperator);
                    }
                }
                if (stack.length > 0 && stack[stack.length - 1] === '(') {
                    stack.pop();
                }
                else {
                    throw Error('Invalid incoming expression');
                }
            }
            else {
                throw Error('Invalid incoming expression');
            }
        }
        while (stack.length > 0) {
            const lastInStackOperator = stack.pop();
            if (lastInStackOperator && this.operators.hasOwnProperty(lastInStackOperator)) {
                out.push(lastInStackOperator);
            }
            else {
                throw Error('Invalid incoming expression');
            }
        }
        return out;
    }
    /**
     * Calculating result of rpn array
     * @param {string[]} array
     * @returns {number} calc result
     */
    calcRpn(arr) {
        const resultArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (Utils.isNumeric(arr[i])) {
                resultArr.push(arr[i]);
            }
            else {
                const a = resultArr.pop();
                const b = resultArr.pop();
                if (arr[i] === '+') {
                    resultArr.push(parseFloat(a) + parseFloat(b));
                }
                else if (arr[i] === '-') {
                    resultArr.push(parseFloat(b) - parseFloat(a));
                }
                else if (arr[i] === '*') {
                    resultArr.push(parseFloat(a) * parseFloat(b));
                }
                else if (arr[i] === '/') {
                    resultArr.push(parseFloat(b) / parseFloat(a));
                }
                else if (arr[i] === '^') {
                    resultArr.push(Math.pow(parseFloat(b), parseFloat(a)));
                }
            }
        }
        if (resultArr.length > 1) {
            throw Error('Postfix calculation error');
        }
        let result = resultArr[0];
        if (Utils.isNumeric(result)) {
            if (!Number.isInteger(result)) {
                // result = Number(parseFloat(result).toFixed(2));
            }
        }
        else {
            throw Error('Postfix calculation error');
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jYWxjL2NhbGN1bGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBRVUsY0FBUyxHQUE0QztZQUMzRCxHQUFHLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLENBQUM7YUFDWjtZQUNELEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsQ0FBQzthQUNaO1lBQ0QsR0FBRyxFQUFFO2dCQUNILFFBQVEsRUFBRSxDQUFDO2FBQ1o7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLENBQUM7YUFDWjtZQUNELEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUUsQ0FBQzthQUNaO1NBQ0YsQ0FBQTtJQXNJSCxDQUFDO0lBcElDOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsS0FBYTtRQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUN4QztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLEtBQWE7UUFFeEIsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO1FBQzNCLE1BQU0sR0FBRyxHQUFhLEVBQUUsQ0FBQztRQUV6QixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRCxxQ0FBcUM7UUFDckMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSw4QkFBOEI7UUFDOUIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBRWpELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBRTdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO3VCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDbkYsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN6QixJQUFJLElBQUksRUFBRTt3QkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQjtvQkFDRCxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO2dCQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDMUI7aUJBQU0sSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JCO2lCQUFNLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDMUIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzFELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3hCO2lCQUNGO2dCQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUN2RCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsTUFBTSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztpQkFDNUM7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hDLElBQUksbUJBQW1CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDN0UsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDNUM7U0FFRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxPQUFPLENBQUMsR0FBYTtRQUNuQixNQUFNLFNBQVMsR0FBVSxFQUFFLENBQUM7UUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUUxQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ2xCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtTQUNGO1FBRUQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFCLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDN0Isa0RBQWtEO2FBQ25EO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YifQ==