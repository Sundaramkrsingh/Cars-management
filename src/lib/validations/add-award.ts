import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
  invalidUrl: "Invalid Url",
}

const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[a-zA-Z0-9_.-]*)*(\?[a-zA-Z0-9=&_%-]*)?(#\S*)?$/

export const userAwardSchema = z.object({
  title: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  description: z
    .string()
    .min(1, messages.mandatory)
    .max(300, messages.exceedCharrCount),
  link: z
    .string()
    .min(1, messages.mandatory)
    .regex(urlRegex, { message: messages.invalidUrl }),
})
