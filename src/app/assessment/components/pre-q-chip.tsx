import { useChat } from "@/store/chat-provider"
import React from "react"

const PreQChip = ({
  info = "Next question for 100 stars.",
}: {
  info?: string
}) => {
  const {
    chat: { powerUp, currentStage },
  } = useChat()((state) => state)

  const powerUpMessages: { [key: string]: string } = {
    PLUS_5_SECONDS: "You activated +5 sec for this question",
    PLUS_10_SECONDS: "You activated +10 sec for this question",
    TWICE_UP: "You activated twice up for this question",
    THRICE_UP: "You activated thrice up for this question",
  }

  if (powerUp != null && currentStage === "in-q") {
    info = powerUpMessages[powerUp] || info
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-fit h-8 rounded-xl text-sm flex px-2 justify-center bg-dark-slate-gray items-center z-10">
        {info}
      </div>
    </div>
  )
}

export default PreQChip
