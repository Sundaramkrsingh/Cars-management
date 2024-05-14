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

export const PreQ = ({
  questionnaire,
  ...rest
}: {
  questionnaire: number
  type?: string
}) => {
  const {
    chat: { activeQuestionnaire, currentStage, activeQState, seriesType },
    setCurrentStage,
    setActiveQState,
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

  const handelClick = () => {
    setActiveQState(`in-q-${questionnaire}`)
    router.push(`#in-q-${questionnaire}`)
    setCurrentStage("in-q")
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
