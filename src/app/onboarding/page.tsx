"use client"

import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { useCurrentRoles, useGoals, useHearAboutUs } from "@/query/onboarding"
import { useUserDetails } from "@/store/sing-up-provider"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ProfileInfo from "./components/profile-info"
import UserInfo from "./components/user-info"
import { userInfoConfig } from "./constants"

type OptionManager = {
  [key: string]: () => void
}

const Onboarding = () => {
  const { editGoals, getAllGoals, createGoals } = useGoals()
  const { getAllHearAboutUs, updateHearAboutUsDts } = useHearAboutUs()
  const { editCurrentRoles, getAllRoles } = useCurrentRoles()

  const { setOptions } = useUserDetails()((state) => state)

  const [progress, setProgress] = useState<number>(0)
  const [selections, setSelections] = useState<{
    [key: string]: string[] | string | null
  }>({})
  const [activeCategory, setActiveCategory] = useState<string>("hear")

  const handleError = () => {
    toast.error("Something went wrong, please try again")
  }

  const handleClick = {
    hear: () => {
      updateHearAboutUsDts.mutateAsync(
        { hearAboutUs: `${selections["hear"]}` },
        {
          onError: handleError,
        }
      )
      setActiveCategory("role")
      setProgress(25)
    },
    role: () => {
      editCurrentRoles.mutateAsync(
        { role: selections["role"] },
        { onError: handleError }
      )
      setActiveCategory("goal")
      setProgress(55)
    },
    goal: () => {
      editGoals.mutateAsync(
        { goals: selections["goal"] },
        { onError: handleError }
      )
      setActiveCategory("profile-info")
      setProgress(75)
    },
  }

  useEffect(() => {
    setOptions({
      hear: getAllHearAboutUs?.data?.data?.data,
    })
    setOptions({ role: getAllRoles?.data?.data?.data })
    setOptions({ goal: getAllGoals?.data?.data?.data })
  }, [
    getAllGoals?.data?.data?.data,
    getAllHearAboutUs?.data?.data?.data,
    getAllRoles?.data?.data?.data,
    getAllRoles?.data?.data?.data.data,
    setOptions,
  ])

  const backBtnManager = {
    hear: () => {
      // yet to be implemented
    },
    role: () => setActiveCategory("hear"),
    goal: () => setActiveCategory("role"),
    "profile-info": () => setActiveCategory("goal"),
  }
  const currentCategoryProps =
    userInfoConfig[activeCategory as keyof typeof userInfoConfig]

  return (
    <div className="fixed w-[380px] overflow-hidden bg-fixed bg-[center_top_60px] overflow-y-scroll no-scrollbar text-primary px-5 pb-[10px] bg-no-repeat">
      <div className="h-[65px] flex items-center gap-2 text-black">
        <Icons.leftArrow
          onClick={() =>
            backBtnManager[activeCategory as keyof typeof backBtnManager]()
          }
          className="w-7 h-7 cursor-pointer"
        />

        <Progress
          indicatorClass="bg-eagle-green rounded-[11px]"
          className="bg-light-silver rounded-[11px] h-2 w-full"
          value={progress}
        />
      </div>

      {activeCategory === "profile-info" ? (
        <ProfileInfo setProgress={setProgress} />
      ) : (
        <UserInfo
          {...currentCategoryProps}
          key={currentCategoryProps?.title}
          onClick={
            handleClick[
              currentCategoryProps?.category as keyof typeof handleClick
            ]
          }
          selections={selections}
          setSelections={setSelections}
          selectOne={activeCategory !== "goal"}
        />
      )}
    </div>
  )
}

export default Onboarding
