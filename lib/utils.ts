import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addHours(date: Date, hours: number) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)

  return date
}
