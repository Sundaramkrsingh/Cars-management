import { Icons } from "@/components/icons"
import { useChat } from "@/store/chat-provider"
import React, { useEffect, useState } from "react"

const QuestionWrapper = ({
  children,
  className,
  feedback = false,
  questionnaire,
}: {
  children: React.ReactNode
  className?: string
  feedback?: boolean
  questionnaire?: number
}) => {
  const {
    chat: { activeQuestionnaire, feedback: globalFeedback },
  } = useChat()((state) => state)

  const [showIntent, setShowIntent] = useState<any>(false)

  useEffect(() => {
    if (
      globalFeedback?.[activeQuestionnaire] &&
      activeQuestionnaire === questionnaire
    ) {
      setShowIntent(globalFeedback?.[activeQuestionnaire].intent)
    }
  }, [activeQuestionnaire, globalFeedback, questionnaire, showIntent])

  return (
    <div
      className={`${className} relative p-5 max-w-[300px] bg-foreground rounded-b-2xl rounded-e-2xl rounded-br-none overflow-hidden flex flex-col gap-7`}
    >
      <div className="border-gradient top-0 left-0 absolute" />
      {children}
      {showIntent && (
        <>
          {showIntent === "positive" && (
            <Icons.positiveFeedBack className="absolute bottom-[-18px] right-[-10px]" />
          )}
          {showIntent === "negative" && (
            <Icons.negativeFeedBack className="absolute bottom-[-18px] right-[-10px]" />
          )}
        </>
      )}
    </div>
  )
}

export default QuestionWrapper
