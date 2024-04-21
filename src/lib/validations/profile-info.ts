import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userProfileInfoSchema = z.object({
  firstName: z.string().min(1, messages.mandatory),
  lastName: z.string().min(1, messages.mandatory),
  pinCode: z
    .string()
    .min(6, messages.mandatory)
    .max(6, messages.exceedCharrCount),
})
