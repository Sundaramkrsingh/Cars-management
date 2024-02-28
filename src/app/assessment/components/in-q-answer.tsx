"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import type { Answer, OptionCatagories, Options, Validity } from "../type"

type InQAnswerProps = {
  setAnswerBarVisibility: Dispatch<SetStateAction<boolean>>
  setActiveOption: Dispatch<SetStateAction<Options | undefined>>
  activeOption: Options | undefined
  options: { label: string; value: string }[]
  setValidity: Dispatch<SetStateAction<Validity>>
  optionsCategory: OptionCatagories
  setAnsDialogueMargin: Dispatch<SetStateAction<boolean>>
  setAnswer: Dispatch<SetStateAction<Answer>>
  questionnaire: number
  answer?: Answer
}

const Option = ({
  value,
  className,
  onClick,
  activeOption,
}: {
  value: Options
  onClick: (value: Options) => void
  activeOption?: string
  className?: string
}) => {
  const activeClass = "!text-white !bg-eucalyptus"

  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "h-full w-1/4 bg-white border flex justify-center items-center text-xl text-dark-slate-gray border-celadon-green transition-all duration-500",
        activeOption === value && activeClass,
        className
      )}
    >
      {value}
    </button>
  )
}

const InQAnswer = ({
  setActiveOption,
  setAnswer,
  activeOption,
  options,
  setValidity,
  optionsCategory,
  setAnsDialogueMargin,
  questionnaire,
}: InQAnswerProps) => {
  const router = useRouter()

  const { setActiveQState, setInQAnswerVisibility, setCurrentStage } =
    useChat()((state) => state)

  const isPartial = optionsCategory === "partial"

  const handelClick = (value: Options) => {
    setActiveOption(value)
  }

  const show = (answer: Answer) => {
    setTimeout(() => {
      setValidity(
        answer?.selectedOption?.label === "Shah Jahan" ? "correct" : "wrong"
      )
      setAnsDialogueMargin(false)
      setActiveQState(`post-q-${questionnaire}`)
      router.push(`#post-q-${questionnaire}`)
    }, 1000)
  }

  return (
    <div className="w-answer absolute bottom-5 justify-between flex">
      <div className="h-14 w-[236px] flex">
        <Option
          value="A"
          activeOption={activeOption}
          onClick={handelClick}
          className="rounded-l-2xl"
        />
        <Option value="B" activeOption={activeOption} onClick={handelClick} />
        {!isPartial && (
          <>
            <Option
              value="C"
              activeOption={activeOption}
              onClick={handelClick}
            />
            <Option
              value="D"
              activeOption={activeOption}
              onClick={handelClick}
              className="rounded-r-2xl"
            />
          </>
        )}
      </div>
      <button
        className={cn(
          "h-14 w-14 play-button z-20",
          !activeOption && "!bg-chinese-silver"
        )}
        onClick={() => {
          const optionIdx = activeOption && activeOption?.charCodeAt(0) - 65

          const selectedOption = options[optionIdx as number]

          console.log(selectedOption)

          if (activeOption && selectedOption) {
            setCurrentStage("post-q")
            setInQAnswerVisibility(false)
            setAnswer(() => ({
              optionValue: activeOption as Options,
              selectedOption,
            }))
            show({
              optionValue: activeOption as Options,
              selectedOption,
            })
          }
        }}
      >
        {!activeOption ? <Icons.disabledLock /> : <Icons.lockAnswer />}
      </button>
    </div>
  )
}

export default InQAnswer
