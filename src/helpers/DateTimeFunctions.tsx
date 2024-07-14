import { Timestamp } from "firebase/firestore";

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

// export function formatFibaseTimestamp(dateString: string): string {
//   const datePattern = /^(.*? \d{1,2}, \d{4})/;
//   const match = datePattern.exec(dateString);

//   if (match && match[1]) {
//     return match[1];
//   } else {
//     return "Invalid Date Format";
//   }
// }
// export function formatFibaseTimestamp(timestamp: Timestamp) {
//   const dateObject = new Date(timestamp);
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return dateObject.toLocaleDateString("en-US", options);
// }

/**
 * Checks if the event date is due.
 * @param eventDate - The date of the event.
 * @returns True if the event is due, false otherwise.
 */
export const isEventDue = (eventDate: Date): boolean => {
  const currentDate = new Date();
  return eventDate < currentDate;
};
