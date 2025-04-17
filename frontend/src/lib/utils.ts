import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToISOString(dateInput: string) {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function getPageNumber(url: string): number | null {
  const params = new URL(url).searchParams;
  const page = params.get("page");
  return page ? parseInt(page) : null;
}

export function timeDifferenceToNow(givenDate: Date | string): string {
  const currentDate = new Date();
  const targetDate = new Date(givenDate);

  // Calculate the difference in milliseconds
  const diffInMillis = currentDate.getTime() - targetDate.getTime();

  // If the dates are the same, return 0
  if (diffInMillis === 0) {
    return "0 minutes";
  }

  // Calculate the different time units
  const years = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 365));
  const weeks = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffInMillis / (1000 * 60 * 60));
  const minutes = Math.floor(diffInMillis / (1000 * 60));

  // Return the largest relevant unit of time
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

export function extractReplyID(comment: string): number | null {
  const match = comment.match(/Reply\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

export function extractImageSrcsFromHTML(html: string): string[] {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const images = tempDiv.querySelectorAll("img");
  const imageSrcs: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const src = images[i].getAttribute("src");
    if (src) {
      imageSrcs.push(src.trim()); // Push to the array if a valid src is found
    }
  }

  // console.log(imageSrcs);

  return imageSrcs;
}
