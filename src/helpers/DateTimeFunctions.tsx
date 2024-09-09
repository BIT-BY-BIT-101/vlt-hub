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

export function formatDateOnly(originalDateString: string) {
  // Create a Date object from the input string
  const date = new Date(originalDateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Format the date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

/**
 * Checks if the event date is due.
 * @param eventDate - The date of the event.
 * @returns True if the event is due, false otherwise.
 */
export const isEventDue = (eventDate: Date): boolean => {
  const currentDate = new Date();
  return eventDate < currentDate;
};

export function getMaximumDate() {
  // Calculate the date 18 years ago from today
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  ).toISOString();
  // .split("T")[0]; // Format as 'YYYY-MM-DD'

  return maxDate;
}

export function getMinimumDate() {
  // Calculate the date 100 years ago from today
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  ).toISOString();
  // .split("T")[0]; // Format as 'YYYY-MM-DD'

  return minDate;
}

export const extractTimeFromDateTime = (dateString: string): string => {
  // Split the string at 'T' and return the second part (the time)
  const timePart = dateString.split("T")[1];

  // If there's a time part, return it with 'T', otherwise return an empty string
  return timePart ? `T${timePart}` : "";
};

export const extractDateOnly = (dateString: string): string => {
  // Split the string at 'T' and return the first part (the date)
  const datePart = dateString.split("T")[0];

  // If there's a date part, return it, otherwise return an empty string
  return datePart || "";
};
