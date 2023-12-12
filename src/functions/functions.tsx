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
