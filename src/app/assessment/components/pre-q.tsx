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
import { useAddTrumps, useTrumpsInfo } from "@/query/trumps"
import PreQChip from "./pre-q-chip"

export const PreQ = ({
  questionnaire,
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
      wildCard,
      trumpsInfo,
    },
    setCurrentStage,
    setActiveQState,
    setPowerUp,
    setWildCard,
  } = useChat()((state) => state)

  const router = useRouter()

  const [showPreQ, setShowPreQ] = useState(false)

  const questionTypeMap = {
    default: Default,
    trait: Trait,
  }

  const CurrentQuestion = questionTypeMap[seriesType]

  const { getTrumps } = useTrumpsInfo()

  const { addTrumps } = useAddTrumps()

  useEffect(() => {
    if (activeQuestionnaire === questionnaire) {
      setActiveQState(`pre-q-${questionnaire}`)
      getTrumps.refetch()
    }
  }, [activeQuestionnaire, questionnaire, setActiveQState])

  useEffect(() => {
    router.push(`#pre-q-${questionnaire}`)
  }, [showPreQ, questionnaire, router])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPreQ(activeQState.includes(`pre-q-${questionnaire}`))
    }, 500)

    return () => clearTimeout(timeout)
  }, [activeQState, questionnaire])

  const handleClick = () => {
    setActiveQState(`in-q-${questionnaire}`)
    router.push(`#in-q-${questionnaire}`)
    setCurrentStage("in-q")

    let powerUpId

    switch (powerUp) {
      case "PLUS_5_SECONDS":
        powerUpId = 1
        break
      case "PLUS_10_SECONDS":
        powerUpId = 2
        break
      case "TWICE_UP":
        powerUpId = 3
        break
      case "THRICE_UP":
        powerUpId = 4
        break
      default:
        return null
    }
    if (powerUpId) {
      addTrumps.mutate(
        { powerUpId, questionId: 1 },
        {
          onSuccess: () => {
            setPowerUp(null)
            getTrumps.refetch()
          },
        }
      )
    }
  }

  return (
    <TransitionWrapper
      className={cn(questionnaire === 0 ? "mt-[-10px]" : "mt-5")}
      show={showPreQ}
      id={`pre-q-${questionnaire}`}
    >
      <PreQChip />
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
      {currentStage === "pre-q" && <AssessmentButton onClick={handleClick} />}
    </TransitionWrapper>
  )
}
