"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AssessmentButton from "./assessment-button"
import InfoDrawer from "./info-drawer"
import QuestionWrapper from "./question-wrapper"
import Default from "./questions-series/default"
import Trait from "./questions-series/trait"
import TransitionWrapper from "./transition-wrapper"
import { useAddTrumps } from "@/query/trumps"

export const PreQ = ({
  questionnaire,
  useInQuestion,
  ...rest
}: {
  questionnaire: number
  type?: string
  useInQuestion: any
}) => {
  const {
    chat: {
      activeQuestionnaire,
      currentStage,
      activeQState,
      seriesType,
      powerUp,
    },
    setCurrentStage,
    setActiveQState,
    setPowerUp,
  } = useChat()((state) => state)

  const router = useRouter()

  const [showPreQ, setShowPreQ] = useState(false)

  const questionTypeMap = {
    default: Default,
    trait: Trait,
  }

  const CurrentQuestion = questionTypeMap[seriesType]

  useEffect(() => {
    activeQuestionnaire === questionnaire &&
      setActiveQState(`pre-q-${questionnaire}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    router.push(`#pre-q-${questionnaire}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPreQ])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPreQ(activeQState.includes(`pre-q-${questionnaire}`))
    }, 500)

    return () => clearTimeout(timeout)
  }, [activeQState, questionnaire])

  const { addTrumps } = useAddTrumps()

  const handelClick = () => {
    setActiveQState(`in-q-${questionnaire}`)
    router.push(`#in-q-${questionnaire}`)
    setCurrentStage("in-q")

    if (powerUp == "PLUS_5_SECONDS") {
      console.log(1)
      addTrumps.mutate({ powerUpId: 1, questionId: 1 })

      setPowerUp(null)
    }

    if (powerUp == "PLUS_10_SECONDS") {
      console.log(2)
      addTrumps.mutate({ powerUpId: 2, questionId: 1 })

      setPowerUp(null)
    }
  }

  return (
    <TransitionWrapper
      className={cn(questionnaire === 0 ? "mt-[-10px]" : "mt-5")}
      show={showPreQ}
      id={`pre-q-${questionnaire}`}
    >
      <InfoDrawer />
      <QuestionWrapper
        className={cn(
          currentStage === "pre-q" &&
            questionnaire === activeQuestionnaire &&
            "mb-[200px]"
        )}
      >
        <CurrentQuestion questionnaire={questionnaire} {...(rest as any)} />
      </QuestionWrapper>
      {currentStage === "pre-q" && <AssessmentButton onClick={handelClick} />}
    </TransitionWrapper>
  )
}
