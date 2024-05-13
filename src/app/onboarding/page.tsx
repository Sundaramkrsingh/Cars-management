"use client"

import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { useGoals } from "@/query/onboarding"
import { useUserDetails } from "@/store/sing-up-provider"
import { useEffect, useMemo, useState } from "react"
import ProfileInfo from "./components/profile-info"
import UserInfo from "./components/user-info"
import { hearAboutOptions, roleOptions, userInfoConfig } from "./constants"

type OptionManager = {
  [key: string]: () => void
}

const Onboarding = () => {
  const { getAllGoals, editGoals } = useGoals()

  const {
    setOptions,
    userDetails: { options },
  } = useUserDetails()((state) => state)

  const [progress, setProgress] = useState<number>(0)
  const [selections, setSelections] = useState<{ [key: string]: string[] }>({})
  const [activeCategory, setActiveCategory] = useState<string>("hear")

  const handleClick = {
    hear: () => {
      setActiveCategory("role")
      setProgress(25)
    },
    role: () => {
      setActiveCategory("goal")
      setProgress(55)
    },
    goal: () => {
      editGoals.mutateAsync({ goal: selections["goal"] })
      setActiveCategory("profile-info")
      setProgress(75)
    },
  }

  const optionManager: OptionManager = useMemo(
    () => ({
      hear: () => setOptions(hearAboutOptions),
      role: () => setOptions(roleOptions),
      goal: () => setOptions(getAllGoals?.data?.data.data),
    }),
    [getAllGoals?.data?.data, setOptions]
  )

  useEffect(() => {
    optionManager[activeCategory]?.()
  }, [activeCategory, optionManager])

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
          options={options}
        />
      )}
    </div>
  )
}

export default Onboarding
