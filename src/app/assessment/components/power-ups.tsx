"use client"

import { useChat } from "@/store/chat-provider"
import { useState } from "react"
import DiceDialog from "./dice-dialog"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

type PowerUpValue =
  | "PLUS_5_SECONDS"
  | "PLUS_10_SECONDS"
  | "TWICE_UP"
  | "THRICE_UP"
  | "DICE_UP"
  | null

const powerUpConfig: {
  [key: number]: {
    description: string
    icon: string
    value: PowerUpValue
    disable: boolean
  }
} = {
  1: {
    description: "+5 Seconds",
    icon: "power5",
    value: "PLUS_5_SECONDS",
    disable: false,
  },
  2: {
    description: "+10 Seconds",
    icon: "power10",
    value: "PLUS_10_SECONDS",
    disable: false,
  },
  3: {
    description: "Twice Up",
    icon: "power2x",
    value: "TWICE_UP",
    disable: false,
  },
  4: {
    description: "Thrice Up",
    icon: "power3x",
    value: "THRICE_UP",
    disable: false,
  },
  5: { description: "Dice Up", icon: "dice", value: "DICE_UP", disable: true },
}

const PowerUps = ({
  questionnaire,
  powerUps,
}: {
  questionnaire: number
  powerUps: Array<{ id: number }>
}) => {
  const [active, setActive] = useState<number | string | undefined>()

  const { setPowerUp } = useChat()((state) => state)

  return (
    <div>
      <PreQHeading heading="POWER-UPS" />
      <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
        {powerUps != null &&
          powerUps.map((powerUp) => {
            const config = powerUpConfig[powerUp.id]
            if (!config) return null
            return (
              <PowerUpCard
                key={powerUp.id}
                className={
                  powerUp.id === 1 || powerUp.id === 2
                    ? "col-span-3 row-span-1 p-2 overflow-hidden"
                    : "col-span-2 row-span-1 p-2 overflow-hidden"
                }
                description={config?.description}
                icon={config?.icon}
                id={powerUp.id}
                onClick={() => {
                  if (config?.value) {
                    setPowerUp(config.value)
                  }
                }}
                activeCard={active}
                setActive={setActive}
                questionnaire={questionnaire}
                powerUp={powerUp}
                disable={config?.disable}
              />
            )
          })}
      </div>
    </div>
  )
}

export default PowerUps
