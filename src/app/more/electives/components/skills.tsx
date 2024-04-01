import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { otherOptions as other } from "./constants"

type SkillProps = {}

const sumOfArrayElementLengths = (obj: { [key: string]: string[] }): number => {
  let sum = 0
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      sum += obj[key].length
    }
  }
  return sum
}

const OptionRenderer = ({
  proficiencies,
  options,
  setProficiencies,
}: {
  proficiencies: string[]
  options: { [key: string]: string[] }
  setProficiencies: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const [otherOptions, setOtherOptions] = useState<{ [key: string]: string[] }>(
    options
  )
  const [moreElectiveTab, setMoreElectiveTab] = useState<string>(
    Object.keys(other)[0]
  )

  const allElements = sumOfArrayElementLengths(other)

  return (
    <div className="flex flex-col gap-7 overflow-scroll no-scrollbar">
      <div className="pt-[18px] px-[18px]">
        <div className="flex justify-between">
          <p className="mb-4 text-xl font-medium text-black">
            Your current selection
          </p>
          <p className="text-smoky-black">{`${proficiencies.length}/${allElements}`}</p>
        </div>
        <div className="flex gap-[10px] flex-wrap">
          {proficiencies.map((option, idx) => (
            <div
              className="bg-azureish-white py-[2px] px-[6px] flex items-center gap-[6px] rounded-sm border border-crystal"
              key={`${option}_${idx}`}
            >
              {option}
              <Icons.cancel
                onClick={() => {
                  setProficiencies((prev) =>
                    prev.filter((itm) => itm !== option)
                  )
                }}
                className="cursor-pointer"
              />
            </div>
          ))}
          {proficiencies.length === 0 && (
            <p className="text-imperial-red">
              You have to select at least one option
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-xl px-[18px] font-medium text-black mb-[18px]">
          More electives
        </p>
        <div className="flex flex-col pl-[18px]">
          <div className="flex gap-2 overflow-x-scroll no-scrollbar">
            {Object.keys(otherOptions).map((tab, idx) => (
              <div
                onClick={() => setMoreElectiveTab(tab)}
                key={`${moreElectiveTab}_${tab}_${idx}`}
                className="relative min-w-11 flex justify-center items-center h-7"
              >
                <p
                  className={cn(
                    "text-sm cursor-pointer",
                    tab === moreElectiveTab
                      ? "text-black font-medium"
                      : "text-dark-charcoal"
                  )}
                >
                  {tab}
                </p>
                {tab === moreElectiveTab && (
                  <div className="absolute w-full h-[2px] bg-dark-slate-gray bottom-0" />
                )}
              </div>
            ))}
          </div>
          <Separator className="mb-7 bg-platinum" />
        </div>

        <div className="flex gap-[10px] flex-wrap px-[18px] pb-[18px]">
          {otherOptions[moreElectiveTab as keyof typeof otherOptions].map(
            (option, idx) => (
              <div
                className="bg-transparent py-[2px] px-[6px] cursor-pointer rounded-sm border border-platinum"
                key={`${moreElectiveTab}_${option}_${idx}`}
                onClick={() =>
                  !proficiencies.includes(option) &&
                  setProficiencies((prev) => [...prev, option])
                }
              >
                {option}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

const Skills = ({}: SkillProps) => {
  const [proficiencies, setProficiencies] = useState<string[]>([
    "Programming Languages",
    "Version Control Systems",
    "Software Development Frameworks",
  ])

  return (
    <>
      <div className="bg-crayola px-[18px] h-10 flex items-center justify-center rounded-t-[10px]">
        <p>This can only be changed in 272 days</p>
      </div>
      <div className="bg-white rounded-b-[10px]">
        <OptionRenderer
          options={other}
          proficiencies={proficiencies}
          setProficiencies={setProficiencies}
        />
      </div>
    </>
  )
}

export default Skills
