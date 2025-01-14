"use client"

import { Icons } from "@/components/icons"
import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { Suspense } from "react"
import { Header as MoreHeader } from "./header"

type LayoutProps = { children: React.ReactNode }

const More = ({ children }: LayoutProps) => {
  return (
    <>
      <MoreHeader />
      <div>{children}</div>
      <MobileNavigationBar />
    </>
  )
}

const Profile = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams()

  const edit = searchParams.get("edit")
  const work = searchParams.get("work")
  const project = searchParams.get("project")
  const license = searchParams.get("license")
  const education = searchParams.get("education")
  const awards = searchParams.get("awards")
  const basic = searchParams.get("basic")

  const navHeadingMap = {
    profile: "Basic Information",
    "work-experience": "Work experiences",
    "add-experience": work ? "Edit experience" : "Add experience",

    projects: "Projects",
    "add-projects": project ? "Edit projects" : "Add Projects",

    licenses: "Licenses & Certifications",
    "add-licenses": license
      ? "Edit licenses & certifications"
      : "Add licenses & certifications",

    education: "Education",
    "add-education": education ? "Edit education" : "Add Education",

    awards: "Awards and Achievements",
    "add-awards": awards
      ? "Edit awards and achievements"
      : "Add awards and achievements",

    "basic-information": "Basic Information",
    "add-basic-information": basic
      ? "Edit basic information"
      : "Add basic Information",

    "modify-work-goals": "What’s your goal?",

    default: "My profile",
  }

  const previousRouteMap: Record<string, string> = {
    "add-experience": "work-experience",
    "add-projects": "projects",
    "add-licenses": "licenses",
    "add-education": "education",
    "add-awards": "awards",
    "add-basic-information": "basic-information",
  }
  let url = "/"
  if (edit && edit in previousRouteMap) {
    url = `/more/profile?edit=${previousRouteMap[edit]}`
  } else {
    url = Object.keys(navHeadingMap).includes(edit as string)
      ? "/more/profile"
      : "/"
  }

  const heading =
    navHeadingMap[edit as keyof typeof navHeadingMap] ||
    navHeadingMap["default"]

  return (
    <>
      <div className="h-[65px] flex items-center gap-2 text-black p-5">
        <Link href={url}>
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">{heading}</h1>
      </div>
      {children}
    </>
  )
}

const Filter = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="h-[65px] flex items-center gap-2 text-black p-5">
        <Link href="/more/electives">
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">Filter</h1>
      </div>
      {children}
    </>
  )
}

const Electives = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="h-[65px] flex items-center gap-2 text-black p-5">
        <Link href="/more">
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">My electives</h1>
      </div>
      {children}
    </>
  )
}

const Help = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Legal = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Facets = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Stage = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Grade = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Trumps = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const Report = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const ProgressionSummary = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const PerformanceSummary = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const FACETSScore = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const StrengthsWeaknesses = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}
const CompetenciesGrades = ({ children }: LayoutProps) => {
  return <div>{children}</div>
}

function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const layoutMap = {
    "/more/electives/filter": Filter,
    "/more/profile": Profile,
    "/more/electives": Electives,
    "/more": More,
    "/more/help": Help,
    "/more/legal": Legal,
    "/more/help/facets": Facets,
    "/more/help/stage": Stage,
    "/more/help/grade": Grade,
    "/more/help/trumps": Trumps,
    "/more/help/report": Report,
    "/more/help/report/progression-summary": ProgressionSummary,
    "/more/help/report/performance-summary": PerformanceSummary,
    "/more/help/report/facets-score": FACETSScore,
    "/more/help/report/strengths-weaknesses": StrengthsWeaknesses,
    "/more/help/report/competencies-grades": CompetenciesGrades,
  }

  const CurrentLayout = layoutMap[pathname as keyof typeof layoutMap]

  return (
    <Suspense>
      <CurrentLayout>{children}</CurrentLayout>
    </Suspense>
  )
}

export default LayoutManager
