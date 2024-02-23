"use client"

import { Icons } from "@/components/icons"
import { useState } from "react"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

const WildCards = ({ questionnaire }: { questionnaire: number }) => {
  const [active, setActive] = useState<number | string | undefined>()

  const commonPowerUpProps = {
    activeCard: active,
    setActive,
    active,
    questionnaire,
  }

  return (
    <div>
      <PreQHeading heading="WILDCARDS" />
      <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
        <div
          className={`col-span-2 row-span-2 flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-2`}
        >
          <Icons.aba className="ml-[-12px]" />
          <p className="text-black text-xs font-medium">Ask ABA</p>
        </div>
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Thrice Up"
          icon="half2"
          state="locked"
          id={1}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Chosen One"
          icon="chart"
          id={2}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Double edge"
          icon="heartDouble"
          id={3}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Time Machine"
          icon="timeMachine"
          id={4}
          {...commonPowerUpProps}
        />
      </div>
    </div>
  )
}

export default WildCards
