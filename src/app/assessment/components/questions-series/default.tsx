"use client"

import { Foresight, PowerUps } from "../../components"
import type { QuestionProps } from "./series-type"

const Default = ({ questionnaire, ...rest }: any) => {
  const {
    foresight: { avgTime, accuracy, timeLimit, tier1, tier2, tier3 },
    powerUps,
  } = rest

  return (
    <>
      <Foresight
        avgTime={avgTime}
        accuracy={accuracy}
        timeLimit={timeLimit}
        tier1={tier1}
        tier2={tier2}
        tier3={tier3}
      />
      <PowerUps questionnaire={questionnaire} powerUps={powerUps} />
      {/* <WildCards questionnaire={questionnaire} />  */}
    </>
  )
}

export default Default
