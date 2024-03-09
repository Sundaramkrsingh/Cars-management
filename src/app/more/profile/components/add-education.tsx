import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userEducationSchema } from "@/lib/validations/add-education"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"

const AddEducation = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const educationIdx = searchParams.get("education")

  const {
    profileFormData: { education },
    setEducation,
    setEducationEdit,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userEducationSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userEducationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      startDate: "" as any,
      endDate: "" as any,
    },
  })

  useEffect(() => {
    if (educationIdx) {
      const endDate = new Date(education[+educationIdx].endDate)
        .toISOString()
        .slice(0, 10)

      const startDate = new Date(education[+educationIdx].startDate)
        .toISOString()
        .slice(0, 10)

      form.reset({ ...education[+educationIdx], startDate, endDate } as any)
    }
  }, [education, form, educationIdx])

  const handelSubmit = (data: any) => {
    if (educationIdx) {
      setEducationEdit(data, +educationIdx)
      setEdit(null)
    } else {
      setEducation(data)
      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {educationIdx && <EditDrawer />}
      <div className="flex flex-col gap-[18px]">
        <Input
          label="Institution name"
          name="institution"
          form={form}
          placeholder="Enter you school or college name"
        />
        <Input
          label="Degree"
          name="degree"
          form={form}
          placeholder="Ex : B.tech"
        />
        <Input label="Start date" name="startDate" type="date" form={form} />
        <Input label="End date" name="endDate" type="date" form={form} />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddEducation
