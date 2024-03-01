"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type { Answer, OptionCatagories, Options, Validity } from "../type"
import AnswerDialogue from "./answer-dialogue"
import InQAnswer from "./in-q-answer"
import InQOptions from "./in-q-options"
import QuestionWrapper from "./question-wrapper"
import TransitionWrapper from "./transition-wrapper"

const questionConfig: {
  questionNumber: number
  questionCount: number
  question: string
  options: { label: string; value: string }[]
} = {
  questionNumber: 2,
  questionCount: 10,
  question: "what is the capital of India.",
  options: [
    { label: "Mumbai", value: "mumbai" },
    { label: "Goa", value: "gao" },
    { label: "Delhi", value: "delhi" },
    { label: "Kolkata", value: "kolkata" },
  ],
}

const InQ = ({ questionnaire }: { questionnaire: number }) => {
  const {
    chat: { activeQState, currentStage },
  } = useChat()((state) => state)

  const [showInQ, setShowInQ] = useState(false)
  const [answerBarVisibility, setAnswerBarVisibility] = useState<boolean>(true)
  const [answer, setAnswer] = useState<Answer>()
  const [activeOption, setActiveOption] = useState<Options>()
  const [answerValidity, setAnswerValidity] = useState<Validity>("default")
  const [optionsCategory, setOptionsCategory] =
    useState<OptionCatagories>("full")
  const [ansDialogueMargin, setAnsDialogueMargin] =
    useState<boolean>(answerBarVisibility)

  useEffect(() => {
    if (activeQState.includes(`in-q-${questionnaire}`)) {
      setShowInQ(true)
    }
  }, [activeQState, questionnaire])

  return (
    <TransitionWrapper show={showInQ} id={`in-q-${questionnaire}`}>
      <QuestionWrapper
        className={cn("mt-5", currentStage === "in-q" && "mb-[200px]")}
      >
        <InQOptions questionConfig={questionConfig} />
      </QuestionWrapper>
      <AnswerDialogue
        className={cn(
          currentStage === "in-q" && ansDialogueMargin && "mb-[200px]"
        )}
        {...answer}
        validity={answerValidity}
      />
      {currentStage === "in-q" && (
        <InQAnswer
          setAnswer={setAnswer as Dispatch<SetStateAction<Answer>>}
          setActiveOption={setActiveOption}
          activeOption={activeOption}
          options={questionConfig.options}
          setValidity={setAnswerValidity}
          optionsCategory={optionsCategory}
          setAnsDialogueMargin={setAnsDialogueMargin}
          answer={answer}
          questionnaire={questionnaire}
          setAnswerBarVisibility={setAnswerBarVisibility}
        />
      )}
    </TransitionWrapper>
  )
}

export default InQ
