"use client"

import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import ProfileInfo from "./components/profile-info"
import UserInfo from "./components/user-info"
import { userInfoConfig } from "./constants"

const Onboarding = () => {
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
      setActiveCategory("profile-info")
      setProgress(75)
    },
  }

  const backBtnManager = {
    hear: () => {
      // yet to be implemented
    },
    role: () => setActiveCategory("hear"),
    goal: () => setActiveCategory("role"),
    "profile-info": () => setActiveCategory("goal"),
  }

  return (
    <>
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
        {userInfoConfig.map(
          ({ ...rest }) =>
            activeCategory === rest.category && (
              <UserInfo
                key={rest.title}
                onClick={handleClick[rest.category as keyof typeof handleClick]}
                selections={selections}
                setSelections={setSelections}
                {...rest}
              />
            )
        )}
        {activeCategory === "profile-info" && (
          <ProfileInfo setProgress={setProgress} />
        )}
      </div>
    </>
  )
}

export default Onboarding
