"use client"

import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import ProfileEdit from "./profile-edit"
import ProfileTab from "./profile-tab"
import AddExperience from "./add-experience"

const Default = ({ setEdit }: PageProps) => <ProfileTab setEdit={setEdit} />

const WorkExperience = ({ setEdit }: PageProps) => {
  return <>Work Experience</>
}
const Projects = ({ setEdit }: PageProps) => {
  return <>Projects</>
}

const Licenses = ({ setEdit }: PageProps) => {
  return <>Licenses</>
}

const Education = ({ setEdit }: PageProps) => {
  return <>Education</>
}

const Awards = ({ setEdit }: PageProps) => {
  return <>Awards</>
}

const Resume = ({ setEdit }: PageProps) => {
  return <>Resume</>
}

const PageRenderer = () => {
  const [edit, setEdit] = useQueryState("edit")

  const pageMap = {
    profile: ProfileEdit,
    "add-experience": AddExperience,
    "work-experience ": WorkExperience,
    projects: Projects,
    licenses: Licenses,
    education: Education,
    awards: Awards,
    resume: Resume,
    default: Default,
  }

  const Page = pageMap[edit as keyof typeof pageMap] || pageMap["default"]

  return <Page setEdit={setEdit} />
}

export default PageRenderer
