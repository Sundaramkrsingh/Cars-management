"use client"

import { Foresight, PowerUps, WildCards } from "../../components"

const Default = ({ questionnaire }: any) => {
  return (
    <>
      <Foresight />
      <PowerUps questionnaire={questionnaire} />
      <WildCards questionnaire={questionnaire} />
    </>
  )
}

export default Default
