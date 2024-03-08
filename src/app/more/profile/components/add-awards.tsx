import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import { userAwardSchema } from "@/lib/validations/add-award"

const AddAwards = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const award = searchParams.get("awards")

  const {
    profileFormData: { awards },
    setAwards,
    setAwardEdit,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userAwardSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userAwardSchema),
    defaultValues: {
      description: "",
      link: "",
      title: "",
    },
  })

  useEffect(() => {
    if (award) {
      form.reset(awards[+award])
    }
  }, [awards, form, award])

  const handelSubmit = (data: any) => {
    if (award) {
      setAwardEdit(data, +award)
      setEdit(null)
      console.log({ awards })
    } else {
      setAwards(data)
      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {award && (
        <Icons.delete
          onClick={() => {}}
          className="text-celadon-green font-medium text-lg absolute cursor-pointer right-5 top-[-50px]"
        />
      )}
      <div className="flex flex-col gap-[18px]">
        <Input
          label="Project title"
          name="title"
          form={form}
          placeholder="Ex : Face detection model"
        />
        <TextArea
          label="Description"
          name="description"
          form={form}
          placeholder="Add details about things you did in the project"
          textArea
        />
        <Input
          label="Link to to project"
          name="link"
          form={form}
          placeholder="Paste link to more details about project"
        />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddAwards
