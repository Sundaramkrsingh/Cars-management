import { Dispatch, SetStateAction } from "react"

export type PostAssessmentProps = {
  setStage: Dispatch<SetStateAction<string>>
  stage: string
}
