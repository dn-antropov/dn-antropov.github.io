const DIGITS = ['▶︎', '▼︎', '◀︎', '▲︎'];

export const toQuaternary = (value, length = 0) =>
  value.toString(4).padStart(length, '0').split('').map((digit) => DIGITS[Number(digit)]);

export const withQuaternaryNumbers = (text) =>
  text.replace(/\d+/g, (number) => toQuaternary(Number(number)).join(''));
