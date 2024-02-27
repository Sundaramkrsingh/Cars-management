"use client"

import { useSearchParams } from "next/navigation"
import ProfileTab from "./profile-tab"

const Default = () => <ProfileTab />

const ProfileEdit = () => {
  return <>Edit</>
}

const WorkExperience = () => {
  return <>Work Experience</>
}

const Projects = () => {
  return <>Projects</>
}

const Licenses = () => {
  return <>Licenses</>
}

const Education = () => {
  return <>Education</>
}

const Awards = () => {
  return <>Awards</>
}

const Resume = () => {
  return <>Resume</>
}

const BasicInformation = () => {
  return <>Basic Information</>
}

const PageRenderer = () => {
  const searchParams = useSearchParams()

  const edit = searchParams.get("edit")

  const pageMap = {
    profile: ProfileEdit,
    "work-experience": WorkExperience,
    projects: Projects,
    licenses: Licenses,
    education: Education,
    awards: Awards,
    resume: Resume,
    "basic-information": BasicInformation,
    default: Default,
  }

  const Page = pageMap[edit as keyof typeof pageMap] || pageMap["default"]

  return <Page />
}

export default PageRenderer
