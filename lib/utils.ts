import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date:any) {
  // Ensure date is a valid Date object
  if (!(date instanceof Date)) {
      throw new Error("Invalid date object");
  }

  // Get the individual components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1 and pad with zeros if necessary
  const day = String(date.getDate()).padStart(2, '0'); // Pad with zeros if necessary
  const hours = String(date.getHours()).padStart(2, '0'); // Pad with zeros if necessary
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad with zeros if necessary
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Pad with zeros if necessary
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Pad with zeros if necessary

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDate;
}
