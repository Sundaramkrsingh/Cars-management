"use client"

import { usePostAnswer } from "@/query/in-q"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"

const useTimeManager = () => {
  const router = useRouter()

  const {
    chat: { activeQuestionnaire, questionCount, powerUp, questions },
    setCurrentStage,
    setActiveQState,
    setInQAnswerVisibility,
    setActiveQuestionnaire,
    setTimeConsumed,
    setPostAssessmentStatus,
  } = useChat()((state) => state)

  const {
    postAns: { mutateAsync, data: ansResp },
  } = usePostAnswer()

  const baseInQTime = 20

  const inQTimeManager = (powerUp: string | null) => {
    switch (powerUp) {
      case "PLUS_5_SECONDS":
        return baseInQTime + 5
      case "PLUS_10_SECONDS":
        return baseInQTime + 10
      default:
        return baseInQTime
    }
  }

  let inQInitialTime = inQTimeManager(powerUp)

  return {
    "pre-q": {
      initialTime: 10,
      onTimeOut: () => {
        setTimeConsumed("time-out", "pre-q")
        setActiveQState(`in-q-${activeQuestionnaire}`)
        router.push(`#in-q-${activeQuestionnaire}`)
        setCurrentStage("in-q")
      },
    },
    "in-q": {
      initialTime: inQInitialTime,
      onTimeOut: () => {
        setTimeConsumed("time-out", "in-q")
        mutateAsync({
          answer: "",
          currentQuestionNo: activeQuestionnaire + 1,
          timeSpent: 0,
          isQuestionSkipped: true,
          questionId: questions[activeQuestionnaire]?.inq?.questionId,
        })
        setActiveQState(`post-q-${activeQuestionnaire}`)
        router.push(`#post-q-${activeQuestionnaire}`)
        setCurrentStage("post-q")
        setInQAnswerVisibility(false)
      },
    },
    "post-q": {
      initialTime: 15,
      onTimeOut: () => {
        if (activeQuestionnaire < questionCount - 1) {
          setTimeConsumed("time-out", "post-q")
          setActiveQState(`pre-q-${1 + activeQuestionnaire}`)
          setActiveQuestionnaire(1 + activeQuestionnaire)
          setCurrentStage("pre-q")
          router.push(`#pre-q-${1 + activeQuestionnaire}`)
        }
      },
    },
  }
}

export default useTimeManager
