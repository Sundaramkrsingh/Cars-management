"use client"

import InQ from "./components/in-q"
import PostQ from "./components/post-q"
import { PreQ } from "./components/pre-q"
import PreQChip from "./components/pre-q-chip"
import { res } from "../../../core.res"
import { useChat } from "@/store/ChatProvider"
import { useEffect } from "react"

export default function Chat() {
  const { setQuestionCount } = useChat()((state) => state)

  useEffect(() => {
    setQuestionCount(res.length - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PreQChip />
      {res.map(({ preQ, inQ, postQ }, index) => (
        <div key={index}>
          <PreQ {...preQ} questionnaire={index} />
          <InQ {...inQ} questionnaire={index} />
          <PostQ {...postQ} questionnaire={index} />
        </div>
      ))}
    </>
  )
}
