"use client"

import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userExperienceSchema } from "@/lib/validations/add-experience"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"

const AddExperience = ({ setEdit }: PageProps) => {
  const {
    profileFormData: { experience },
    setProfileEdit,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userExperienceSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userExperienceSchema),
    defaultValues: experience,
  })

  const handelSubmit = () => {
    setProfileEdit(form.getValues())
    setEdit(null)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-[18px]">
        <Input
          label="First Name"
          name="firstName"
          form={form}
          placeholder="Enter your first name"
        />
        <Input
          label="Last Name"
          name="lastName"
          type="date"
          form={form}
          placeholder="Enter your last name"
        />
        <Input
          label="Username"
          name="username"
          form={form}
          disabled
          description="Username can only be changed in 272 days"
        />
        <TextArea
          label="Short Bio"
          name="bio"
          form={form}
          placeholder="Add a short bio about yourself"
          textArea
        />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddExperience
