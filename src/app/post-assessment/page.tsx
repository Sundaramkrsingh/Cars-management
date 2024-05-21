"use client"

import { useState } from "react"
import Completion from "./components/completion"
import Punctuality from "./components/punctuality"

const PostAssessment = () => {
  const [stage, setStage] = useState("punctuality")

  const stageMap = {
    complete: Completion,
    punctuality: Punctuality,
  }

  const PostAssessmentStage = stageMap[stage as keyof typeof stageMap]

  return <PostAssessmentStage stage={stage} setStage={setStage} />
}

export default PostAssessment
