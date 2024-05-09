"use client"

import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import type { PageProps } from "../../type"
import type { EditVariants } from "../type"
import {
  Awards,
  BasicInformation,
  Education,
  Licenses,
  Profile,
  Projects,
  Resume,
  WorkExperience,
  WorkGoals,
} from "./cards"

type ProfileProps = PageProps & {}

const ProfileTab = ({ setEdit, profile, getResume }: ProfileProps) => {
  const handelEditClick = (card: EditVariants) => {
    setEdit(card)
  }

  const commonProps = {
    onClick: handelEditClick,
    setEdit: setEdit,
  }

  return (
    <>
      {profile?.isLoading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      ) : (
        <>
          {profile?.isError ? (
            <div className="w-full h-[70vh] flex flex-col justify-center items-center">
              <Icons.sadAba className="ml-[-30px] w-52 h-56" />
              <p className="mt-5 text-2xl font-semibold">
                Failed to fetch data
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 pb-5">
              <Profile {...commonProps} />
              <WorkExperience {...commonProps} />
              <Projects {...commonProps} />
              <Licenses {...commonProps} />
              <Education {...commonProps} />
              <Awards {...commonProps} />
              <Resume getResume={getResume} />
              {/* <WorkGoals {...commonProps} /> */}
              <BasicInformation {...commonProps} />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ProfileTab
