import { Icons } from "@/components/icons"
import { useChat } from "@/store/chat-provider"
import React from "react"

const QuestionWrapper = ({
  children,
  className,
  feedback = false,
}: {
  children: React.ReactNode
  className?: string
  feedback?: boolean
}) => {
  const {
    chat: {
      feedback: { intent },
    },
  } = useChat()((state) => state)

  return (
    <div
      className={`${className} relative p-5 max-w-[300px] bg-foreground rounded-b-2xl rounded-e-2xl rounded-br-none overflow-hidden flex flex-col gap-7`}
    >
      <div className="border-gradient top-0 left-0 absolute" />
      {children}
      {feedback && (
        <>
          {intent === "positive" && (
            <Icons.positiveFeedBack className="absolute bottom-[-18px] right-[-10px]" />
          )}
          {intent === "negative" && (
            <Icons.negativeFeedBack className="absolute bottom-[-18px] right-[-10px]" />
          )}
        </>
      )}
    </div>
  )
}

export default QuestionWrapper
