export type QuestionProps = {
  questionnaire: number
  ad?: boolean
  foresight: {
    avgTime: string
    accuracy: string
    timeLimit: string
    tier1: string
    tier2: string
    tier3: string
  }
  powerUps: {
    id: number
    name: string
    codeName: string
    status: {
      isConsumed: boolean
      isLocked: boolean
      nextIn: number
    }
  }[]
}
