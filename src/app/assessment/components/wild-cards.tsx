"use client"

import { Icons } from "@/components/icons"
import { useChat } from "@/store/chat-provider"
import { useState } from "react"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"
import { cn } from "@/lib/utils"

const WildCards = ({
  questionnaire,
  wildcards,
}: {
  questionnaire: number
  wildcards: Array<{ id: number }>
}) => {
  const [active, setActive] = useState<number | string | undefined>()

  const { setWildCard } = useChat()((state) => state)

  type WildCardValue =
    | "ASK_ABA"
    | "BETTER_HALF"
    | "CHOSEN_ONE"
    | "DOUBLE_EDGE"
    | "TIME_MACHINE"
    | null

  const wildCardConfig: {
    [key: number]: {
      description: string
      icon: string
      value: WildCardValue
      disable: boolean
    }
  } = {
    6: {
      description: "Ask ABA",
      icon: "aba",
      value: "ASK_ABA",
      disable: false,
    },
    7: {
      description: "Better Half",
      icon: "half2",
      value: "BETTER_HALF",
      disable: true,
    },
    8: {
      description: "Chosen One",
      icon: "chart",
      value: "CHOSEN_ONE",
      disable: true,
    },
    9: {
      description: "Double Edge",
      icon: "heartDouble",
      value: "DOUBLE_EDGE",
      disable: true,
    },
    10: {
      description: " Time Machine",
      icon: "timeMachine",
      value: "TIME_MACHINE",
      disable: true,
    },
  }

  return (
    <div>
      <PreQHeading heading="WILDCARDS" />
      <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
        {wildcards != null &&
          wildcards.map((wildCard) => {
            const config = wildCardConfig[wildCard.id]
            if (!config) return null
            return (
              <PowerUpCard
                key={wildCard.id}
                className={
                  wildCard.id === 6
                    ? "col-span-2 row-span-2 p-2 overflow-visible"
                    : "col-span-2 row-span-1 p-2 overflow-hidden"
                }
                description={config?.description}
                icon={config?.icon}
                id={wildCard.id}
                onClick={() => {
                  if (config?.value) {
                    setWildCard(config.value)
                  }
                }}
                activeCard={active}
                setActive={setActive}
                questionnaire={questionnaire}
                wildCard={wildCard}
                disable={config?.disable}
              />
            )
          })}
      </div>
    </div>
  )
}

export default WildCards
