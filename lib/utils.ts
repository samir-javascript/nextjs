import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimesTamp(createdAt: Date): string {
  // Define time intervals in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference in seconds
  const secondsAgo = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (secondsAgo < minute) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < hour) {
    const minutesAgo = Math.floor(secondsAgo / minute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (secondsAgo < day) {
    const hoursAgo = Math.floor(secondsAgo / hour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (secondsAgo < week) {
    const daysAgo = Math.floor(secondsAgo / day);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (secondsAgo < month) {
    const weeksAgo = Math.floor(secondsAgo / week);
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
  } else if (secondsAgo < year) {
    const monthsAgo = Math.floor(secondsAgo / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
}

// Example usage:
const inputDate = new Date("2023-10-01T12:00:00.000Z"); // Replace with your date
const relativeTime = getTimesTamp(inputDate);

export function formatAndDivideNumber(number: number): string {
  if (number >= 1_000_000) {
    const formattedNumber = (number / 1_000_000).toFixed(1);
    return `${formattedNumber}M`;
  } else if (number >= 1_000) {
    const formattedNumber = (number / 1_000).toFixed(1);
    return `${formattedNumber}K`;
  } else {
    return number.toString();
  }
}

// Example usage:
const largeNumber = 5333365; // Replace with your number
const formattedNumber = formatAndDivideNumber(largeNumber);

// Now, you can use the formatted number and perform additional operations if needed.
const dividedNumber = largeNumber / 1_000_000;