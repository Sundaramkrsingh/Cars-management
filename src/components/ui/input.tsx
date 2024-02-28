import { cn } from "@/lib/utils"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { Icons } from "../icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: string
  form: UseFormReturn<any>
  label: string
  disabled?: boolean
  placeholder?: string
  description?: string
  textArea?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      form,
      name,
      description,
      placeholder,
      label,
      disabled = false,
      textArea = false,
      ...rest
    },
    ref
  ) => {
    const {
      formState: { errors },
      setValue,
    } = form

    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <>
                  <input
                    type={type}
                    className={cn(
                      "input-shadow flex h-10 w-full rounded-[8px] border border-chinese-silver bg-white px-[14px] py-[10px] pr-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-granite-gray focus-visible:outline-none focus-visible:border-celadon-green focus-visible:bg-azureish-white disabled:bg-light-silver disabled:cursor-not-allowed disabled:text-granite-gray",
                      {
                        "!border-red-500": errors[name]?.message,
                        "!bg-white": errors[name]?.message,
                        "h-32": textArea,
                      },
                      className
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...rest}
                    {...field}
                  />
                  {!disabled && field.value && !form.formState.errors[name] && (
                    <Icons.vectorCross
                      onClick={() => setValue(name, "")}
                      className="cursor-pointer absolute top-[34px] right-[14px]"
                    />
                  )}
                </>
              </FormControl>
              {description && (
                <FormDescription className="mt-1">
                  {description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    )
  }
)
Input.displayName = "Input"

export { Input }
