"use client"

import { usePostAnswer } from "@/query/in-q"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"

const useTimeManager = () => {
  const router = useRouter()

  const {
    chat: { activeQuestionnaire, questionCount, powerUp },
    setCurrentStage,
    setActiveQState,
    setInQAnswerVisibility,
    setActiveQuestionnaire,
    setTimeConsumed,
  } = useChat()((state) => state)

  const {
    postAns: { mutateAsync, data: ansResp },
  } = usePostAnswer()

  const baseInQTime = 20

  const inQTimeManager = (powerUp: string | null) => {
    switch (powerUp) {
      case "PLUS_4_SECONDS":
        return baseInQTime + 4
      case "PLUS_8_SECONDS":
        return baseInQTime + 8
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
          currentQuestionNo: activeQuestionnaire + 1,
          timeSpent: -1,
          isQuestionSkipped: true,
          questionId: activeQuestionnaire + 1,
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
