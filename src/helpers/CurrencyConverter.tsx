export function convertToCurrency(value: number) {
  // Divide the value by 100 to shift the decimal place
  let result = value / 100;

  // Format the result to two decimal places
  return result.toFixed(2);
}
