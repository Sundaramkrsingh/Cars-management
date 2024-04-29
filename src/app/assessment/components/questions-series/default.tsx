"use client"

import { Foresight } from "../../components"
import type { QuestionProps } from "./series-type"

const Default = ({
  questionnaire,
  avgTime,
  accuracy,
  timeLimit,
}: QuestionProps) => {
  return (
    <>
      <Foresight avgTime={avgTime} accuracy={accuracy} timeLimit={timeLimit} />
      {/* <PowerUps questionnaire={questionnaire} />
      <WildCards questionnaire={questionnaire} /> */}
    </>
  )
}

export default Default
