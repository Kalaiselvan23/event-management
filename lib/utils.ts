import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { api } from "./axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type Endpoint<T> = {
  url: string;
  key: keyof T;
};
export async function fetchFromApi<T>(
  endpoints: Endpoint<T>[]
): Promise<Partial<T>> {
  try {
    const fetchPromises = endpoints.map((endpoint) =>
      fetch(`${process.env.BASE_URL}/api/${endpoint.url}`, {
        next: {
          revalidate:0,
        },
        method:"GET",
      }).then((response) => response.json())
    );

    const results = await Promise.all(fetchPromises);

    const resultObject = endpoints.reduce(
      (acc: Partial<T>, endpoint, index) => {
        if (endpoint.key === "events" && results[index]?.data) {
          results[index].data = results[index].data.map((event: any) => ({
            ...event,
            date: new Date(event.date),
          }));
        }
        acc[endpoint.key] = results[index];
        return acc;
      },
      {} as Partial<T>
    );
    return resultObject;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function deleteFromApi(id: any, url: any) {
  const response = await api.delete(url, {
    data: {
      id,
    },
  });
  const responseData = await response.data;
  return responseData;
}
export function formatDate(date: any) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0"); // Pad with zeros if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Pad with zeros if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Pad with zeros if necessary
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Pad with zeros if necessary
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0"); // Pad with zeros if necessary

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDate;
}
