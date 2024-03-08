"use client"

import { Icons } from "@/components/icons"
import { cn, dateDiffInYearsOrMonths, monthNames } from "@/lib/utils"
import { useProfileFromData } from "@/store/profile-form-provider"
import Image from "next/image"
import Link from "next/link"
import { useQueryState } from "nuqs"
import React from "react"
import type { PageProps } from "../../type"
import AddAwards from "./add-awards"
import AddBasicInformation from "./add-basic-information"
import AddEducation from "./add-education"
import AddExperience from "./add-experience"
import AddLicenses from "./add-licenses"
import AddProjects from "./add-projects"
import EditWrapperCard from "./edit-wrapper-card"
import ProfileEdit from "./profile-edit"
import ProfileTab from "./profile-tab"
import AddLayout from "./add-layout"
import WorkExperience from "./work-experience"
import Projects from "./projects"
import Licenses from "./licenses"
import Education from "./education"
import Awards from "./awards"
import BasicInformation from "./basic-information"
import Resume from "./resume"

const Default = ({ setEdit }: PageProps) => <ProfileTab setEdit={setEdit} />

const PageRenderer = () => {
  const [edit, setEdit] = useQueryState("edit")

  const pageMap = {
    "work-experience": WorkExperience,
    "add-experience": AddExperience,

    projects: Projects,
    "add-projects": AddProjects,

    licenses: Licenses,
    "add-licenses": AddLicenses,

    education: Education,
    "add-education": AddEducation,

    awards: Awards,
    "add-awards": AddAwards,

    "basic-information": BasicInformation,
    "add-basic-information": AddBasicInformation,

    profile: ProfileEdit,
    resume: Resume,
    default: Default,
  }

  const Page = pageMap[edit as keyof typeof pageMap] || pageMap["default"]

  return <Page setEdit={setEdit} />
}

export default PageRenderer
