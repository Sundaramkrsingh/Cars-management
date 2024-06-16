"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { useChat } from "@/store/chat-provider"

type CardProps = {
  className: string
  icon: string
  description: string
  id: string | number
  state?: "default" | "locked" | "in-active"
  setActive: Dispatch<SetStateAction<string | number | undefined>>
  activeCard: string | number | undefined
  questionnaire: number
  onClick?: () => void
  powerUp?: any
  wildCard?: any
  disable?: boolean
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const DefaultCard = ({
  className,
  icon,
  description,
  state,
  id,
  setActive,
  activeCard,
  questionnaire,
  onClick,
  powerUp,
  wildCard,
}: CardProps) => {
  const isInActive = state === "in-active"

  const {
    chat: { currentStage, activeQuestionnaire },
  } = useChat()((state) => state)

  const isCurrentStagePreQ = currentStage === "pre-q"
  const isActive = !isInActive
  const isQuestionnaireActive = questionnaire === activeQuestionnaire

  const isCardClickable =
    isCurrentStagePreQ && isActive && isQuestionnaireActive

  const iconKey =
    activeCard === id
      ? (`active${capitalizeFirstLetter(icon)}` as keyof typeof Icons)
      : icon

  const Icon = Icons[iconKey as keyof typeof Icons]

  const handleClick = () => {
    if (
      isCardClickable &&
      !powerUp?.status.isConsumed &&
      !wildCard?.status.isConsumed
    ) {
      activeCard === id ? setActive(undefined) : setActive(id)
      onClick && onClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-1 transition-all duration-300",
        className,
        activeCard === id && "bg-eucalyptus",
        isCardClickable ? "cursor-pointer" : "cursor-default"
      )}
    >
      {powerUp?.status.isLocked && (
        <div className="absolute w-full h-full bg-moonstone-blue opacity-80 cursor-default" />
      )}
      {wildCard?.status.isLocked && (
        <div className="absolute w-full h-full bg-moonstone-blue opacity-80 cursor-default" />
      )}
      {id === 6 && wildCard?.status.isConsumed ? (
        <Icons.inactiveAba
          className={cn(activeCard === id && "stroke-white ")}
        />
      ) : (
        <Icon
          className={cn(
            activeCard === id && id !== 6 && "stroke-white",
            id === 6 && !wildCard?.status.isConsumed && "ml-[-12px]"
          )}
        />
      )}

      <p
        className={cn(
          "text-black text-xs text-center font-medium transition-all duration-500",
          activeCard === id && "text-white"
        )}
      >
        {(() => {
          if (powerUp?.status.isConsumed) {
            return `Next in ${powerUp.status.nextIn}Q`
          } else if (wildCard?.status.isConsumed) {
            return `Next in ${wildCard.status.nextIn}`
          } else {
            return description
          }
        })()}
      </p>
    </div>
  )
}

const LockedCard = ({ className }: { className: string }) => (
  <div
    className={cn(
      className,
      "flex flex-col gap-1 bg-transparent justify-center items-center rounded-lg p-2 border border-crystal-blue"
    )}
  >
    <Icons.lock />
    <p className="text-xs font-medium">Unlock with streak</p>
  </div>
)

const DisableCard = ({
  className,
  icon,
}: {
  className: string
  icon: string
}) => {
  const Icon =
    Icons[`active${capitalizeFirstLetter(icon)}` as keyof typeof Icons]

  return (
    <div
      className={cn(
        className,
        "flex flex-col gap-1 bg-[#014455] justify-center items-center rounded-lg p-2 border border-crystal-blue "
      )}
    >
      <Icon />
      <p className="text-xs font-medium">Coming&nbsp;soon</p>
    </div>
  )
}

const PowerUpCard = ({ state = "default", ...rest }: CardProps) => {
  const isLocked = state === "locked"
  const { disable, activeCard } = rest

  return (
    <>
      {disable ? (
        <DisableCard {...rest} />
      ) : (
        <DefaultCard state={state} {...rest} />
      )}
    </>
  )
}

export default PowerUpCard
