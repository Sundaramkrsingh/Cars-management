"use client"

import { useState } from "react"
import ElectiveCard from "./elective-card"

const electiveConfig = [
  {
    heading: "Lingual Proficiency",
    subHeading: "extra series",
    proficiencies: ["Spanish", "Telugu", "Malayalam"],
  },
  {
    heading: "Industry Awareness",
    subHeading: "craft series",
    proficiencies: ["Media & Entertainment", "Chemicals", "Food & FMCG"],
  },
  {
    heading: "Academic Mastery",
    subHeading: "craft series",
    proficiencies: [
      "Class 8, 9 and 10",
      "Class 11, 12 - PCM",
      "Engineering (Core)",
    ],
  },
  {
    heading: "Digital Cognizance",
    subHeading: "Extra series",
    proficiencies: [
      "Internet Security",
      "Quantum Computing",
      "Spreadsheet Tools",
    ],
  },
]

type Proficiency = {
  heading: string
  subHeading: string
  proficiencies: string[]
}[]

const Elective = ({
  proficiencies: skills,
  heading,
  subHeading,
}: {
  heading: string
  subHeading: string
  proficiencies: string[]
}) => {
  const [proficiencies, setProficiencies] = useState<string[]>(skills)

  return (
    <ElectiveCard
      heading={heading}
      subHeading={subHeading}
      proficiencies={proficiencies}
      setProficiencies={setProficiencies}
    />
  )
}

const Electives = ({ electiveData }: { electiveData: Proficiency }) => {
  return (
    <div className="flex flex-col gap-[18px] justify-center items-end mt-5 pb-5">
      {electiveData.map((elective, idx) => {
        return (
          <Elective
            key={`elective_${idx}`}
            {...elective}
            proficiencies={elective.proficiencies}
          />
        )
      })}
    </div>
  )
}

export default Electives
