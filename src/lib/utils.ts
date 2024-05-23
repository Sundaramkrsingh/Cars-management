import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateDiffInYearsOrMonths(date1: Date, date2: Date): string {
  const startDate = new Date(date1)
  const endDate = new Date(date2)

  const totalMonths = Math.abs(
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth())
  )

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const yearString =
    years > 0 ? (years === 1 ? `${years} year` : `${years} years`) : ""
  const monthString = months === 1 ? `${months} month` : `${months} months`

  if (years > 0) {
    return `${yearString} - ${monthString}`
  } else {
    return monthString
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

export const profileManager = (data: any) => ({
  firstName: data?.firstName,
  lastName: data?.lastName,
  username: data?.username,
  bio: data?.bio,
  email: data?.email,
  avatar: {
    initials: "",
    bgColor: "",
    src: data?.avatar,
  },
})

export const basicInformationManager = (data: any) => ({
  email: data?.email,
  dob: data?.dob,
  address: `${data?.address?.line1}, ${data?.address?.cityDistrict}, ${data?.address?.state}, ${data?.address?.country}`,
})

export const experienceManager = (data: any) => ({
  ...data,
  startDate: data?.from,
  endDate: data?.to,
})

export const awardsManager = (data: any) => ({
  ...data,
  link: data?.url || "#",
})

export const educationManager = (data: any) => ({
  ...data,
  institution: data?.schoolCollage,
  startDate: data?.from,
  endDate: data?.to,
})

export const projectsManager = (data: any) => ({
  ...data,
  link: data?.url || "#",
})

export const licensesManager = (data: any) => ({
  ...data,
  certification: data?.name,
  startDate: data?.from,
  expiryDate: data?.to,
  link: data?.url || "#",
})
