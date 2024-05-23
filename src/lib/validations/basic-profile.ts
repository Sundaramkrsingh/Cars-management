import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
  invalidUserName: "Only alphabets are allowed",
}

const namePattern = /^[A-Za-z]+$/

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount)
    .regex(namePattern, { message: messages.invalidUserName }),
  lastName: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount)
    .regex(namePattern, { message: messages.invalidUserName }),
  username: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  bio: z
    .string()
    .min(1, messages.mandatory)
    .max(100, messages.exceedCharrCount),
})
