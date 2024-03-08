import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateDiffInYearsOrMonths(date1: Date, date2: Date): string {
  const startDate = new Date(date1)
  const endDate = new Date(date2)

  const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime())
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365
  const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30 // Approximate

  const diffYears = diffInMilliseconds / millisecondsInYear
  const diffMonths = diffInMilliseconds / millisecondsInMonth

  if (diffYears >= 1) {
    const years = Math.floor(diffYears)
    return years === 1 ? `${years} year` : `${years} years`
  } else {
    const months = Math.floor(diffMonths)
    return months === 1 ? `${months} month` : `${months} months`
  }
}

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
