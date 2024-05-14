"use client"

import { Foresight } from "../../components"
import type { QuestionProps } from "./series-type"

const Trait = ({
  ad = false,
  questionnaire,
  foresight: { avgTime, accuracy, timeLimit, tier1, tier2, tier3 },
}: QuestionProps) => {
  return (
    <>
      <Foresight
        accuracy={accuracy}
        avgTime={avgTime}
        timeLimit={timeLimit}
        tier1={tier1}
        tier2={tier2}
        tier3={tier3}
      />
      {ad && (
        <div className="w-full h-[400px] rounded-[5px] bg-aero-blue animate-pulse" />
      )}
    </>
  )
}

export default Trait
