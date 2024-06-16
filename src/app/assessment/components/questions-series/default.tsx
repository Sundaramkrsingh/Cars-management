"use client"

import { useTrumpsInfo } from "@/query/trumps"
import { Foresight, PowerUps, WildCards } from "../../components"
import type { QuestionProps } from "./series-type"
import { useChat } from "@/store/chat-provider"

const Default = ({ questionnaire, ...rest }: any) => {
  const {
    foresight: { avgTime, accuracy, timeLimit, tier1, tier2, tier3 },
  } = rest

  const {
    chat: { trumpsInfo },
  } = useChat()((state) => state)

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
      <PowerUps questionnaire={questionnaire} powerUps={trumpsInfo?.powerUps} />
      <WildCards
        questionnaire={questionnaire}
        wildcards={trumpsInfo?.wildcards}
      />
    </>
  )
}

export default Default
