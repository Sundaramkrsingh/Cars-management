"use client"

import { useInQuestion } from "@/query/in-q"
import { useChat } from "@/store/chat-provider"
import { useEffect } from "react"
import InQ from "./components/in-q"
import PostQ from "./components/post-q"
import { PreQ } from "./components/pre-q"
import PreQChip from "./components/pre-q-chip"

export default function Chat() {
  const {
    setQuestionCount,
    chat: { questions, questionCount },
  } = useChat()((state) => state)

  useEffect(() => {
    setQuestionCount(questions.length)
  }, [questions, setQuestionCount])

  useInQuestion()

  return (
    <>
      <PreQChip />
      {questions.map(({ preq: preQ, inq: inQ, postQ }: any, index) => {
        return (
          <div key={index}>
            <PreQ {...preQ} questionnaire={index} />
            <InQ {...inQ} questionnaire={index} />
            <PostQ questionnaire={index} />
          </div>
        )
      })}
    </>
  )
}
