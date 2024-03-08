import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userProjectSchema } from "@/lib/validations/add-project"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"

const AddProjects = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const project = searchParams.get("project")

  const {
    profileFormData: { projects },
    setProject,
    setProjectEdit,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userProjectSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userProjectSchema),
    defaultValues: {
      description: "",
      link: "",
      title: "",
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({ ...projects[+project] })
    }
  }, [projects, form, project])

  const handelSubmit = (data: any) => {
    if (project) {
      setProjectEdit(data, +project)
      setEdit(null)
    } else {
      setProject(data)
      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {project && <EditDrawer />}
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

export default AddProjects
