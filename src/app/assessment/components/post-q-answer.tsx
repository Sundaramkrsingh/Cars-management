"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"
import FeedbackDrawer from "./feedback-drawer"

const PostQAnswer = ({ questionnaire }: { questionnaire: number }) => {
  const router = useRouter()

  const {
    chat: { activeQuestionnaire, activeQState, questionCount },
    setActiveQuestionnaire,
    setActiveQState,
    setCurrentStage,
    setFeedback,
  } = useChat()((state) => state)

  return (
    <div className="w-answer absolute bottom-5 justify-between flex z-10">
      <div className="h-14 w-[236px] flex gap-[2px]">
        <FeedbackDrawer
          onClick={() => {
            setFeedback({ intent: "positive" }, activeQuestionnaire)
          }}
          className={cn("rounded-l-2xl")}
          icon="like"
        />
        <FeedbackDrawer
          onClick={() => {
            setFeedback({ intent: "negative" }, activeQuestionnaire)
          }}
          className={cn("rounded-r-2xl")}
          icon="disLike"
        />
      </div>

      <button
        className={cn("h-14 w-14 play-button z-20")}
        onClick={() => {
          if (activeQuestionnaire < questionCount) {
            setActiveQState(`pre-q-${1 + activeQuestionnaire}`)
            setActiveQuestionnaire(1 + activeQuestionnaire)
            setCurrentStage("pre-q")
            router.push(`#pre-q-${1 + activeQuestionnaire}`)
          }
        }}
      >
        <Icons.play />
      </button>
    </div>
  )
}

export default PostQAnswer
