export class Utils {
  static isNumeric(value: string) {
    return !isNaN(parseFloat(value)) && isFinite(+value);
  }
}