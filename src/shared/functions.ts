export function snakeCaseToNormalText(snakeCaseString: string) {
  return snakeCaseString.replace(/_/g, " ").toLowerCase();
}

import { Order } from "@/types/misc";
import dayjs from "dayjs";

export function toTitleCase(input: string): string {
  const smallWords = [
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
  ];

  return input.toLowerCase().replace(/\w+/g, (word, index) => {
    if (index === 0 || !smallWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });
}

export function isObjectEmpty<T extends {}>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};

export const getFutureTime = () => {
  const userOrderTime = dayjs("2023-08-31T02:00:00");
  const currentTime = dayjs().set("minute", 0).set("second", 0);

  if (userOrderTime.hour() >= 9 && userOrderTime.hour() < 17) {
    const deliveryTime = userOrderTime.add(48, "hour");
    return deliveryTime;
  } else if (userOrderTime.hour() >= 17 && userOrderTime.hour() <= 23) {
    const nextDay9am = currentTime.set("hour", 9).add(1, "day");
    const deliveryTime = nextDay9am.add(48, "hour");
    return deliveryTime;
  } else {
    const sameDay9am = currentTime.set("hour", 9);
    const deliveryTime = sameDay9am.add(48, "hour");
    return deliveryTime;
  }
};

export function calculateTotal(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
