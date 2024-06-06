export function formatDateString(originalDateString: string) {
  const dateObject = new Date(originalDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
}

export function formatTimeString(originalTimeString: string) {
  const timeObject = new Date(originalTimeString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return timeObject.toLocaleTimeString("en-US", options);
}

export function convertToCurrency(value: number) {
  // Divide the value by 100 to shift the decimal place
  let result = value / 100;

  // Format the result to two decimal places
  return result.toFixed(2);
}
