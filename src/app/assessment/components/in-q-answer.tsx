"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import type { Answer, OptionCatagories, Options, Validity } from "../type"

type InQAnswerProps = {
  setAnswerBarVisibility: Dispatch<SetStateAction<boolean>>
  setActiveOption: Dispatch<SetStateAction<string | undefined>>
  activeOption: string | undefined
  options: { label: string; value: string }[]
  setValidity: Dispatch<SetStateAction<Validity>>
  optionsCategory: OptionCatagories
  setAnsDialogueMargin: Dispatch<SetStateAction<boolean>>
  setAnswer: Dispatch<SetStateAction<Answer>>
  questionnaire: number
  answer?: Answer
  labelVariant?: string
}

const full = { alphabetic: ["A", "B", "C", "D"] }
const partial = { alphabetic: ["A", "B"], validation: ["Agree", "Disagree"] }

const Option = ({
  value,
  label,
  className,
  onClick,
  activeOption,
}: {
  value: Options
  onClick: (value: Options) => void
  activeOption?: string
  className?: string
  label: string
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
      {label}
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
  labelVariant = "alphabetic",
}: InQAnswerProps) => {
  const isPartial = optionsCategory === "partial"

  const labelType = isPartial
    ? partial[labelVariant as keyof typeof partial]
    : full[labelVariant as keyof typeof full]

  const optionEngine = labelType?.map((label, index) => ({
    value: options[index].value,
    label,
  }))

  const router = useRouter()

  const { setActiveQState, setInQAnswerVisibility, setCurrentStage } =
    useChat()((state) => state)

  const handelClick = (value: Options) => {
    setActiveOption(value)
  }

  const show = (answer: Answer) => {
    setTimeout(() => {
      setValidity(
        answer?.selectedOption?.label === "Delhi" ? "correct" : "wrong"
      )
      setAnsDialogueMargin(false)
      setActiveQState(`post-q-${questionnaire}`)
      router.push(`#post-q-${questionnaire}`)
    }, 1000)
  }

  return (
    <div className="w-answer absolute bottom-5 justify-between flex">
      <div className="h-14 w-[236px] flex rounded-2xl overflow-hidden">
        {optionEngine.map(({ label, value }, idx) => (
          <Option
            key={value}
            label={label}
            value={value}
            activeOption={activeOption}
            onClick={handelClick}
            className={cn(isPartial ? "w-1/2" : "w-1/4")}
          />
        ))}
      </div>
      <button
        className={cn(
          "h-14 w-14 play-button z-20",
          !activeOption && "!bg-chinese-silver"
        )}
        onClick={() => {
          const selectedOption =
            options[options.findIndex(({ value }) => value === activeOption)]

          const optionValue = optionEngine.find(
            ({ value }) => value === activeOption
          )?.label

          if (activeOption && selectedOption) {
            setCurrentStage("post-q")
            setInQAnswerVisibility(false)
            setAnswer(() => ({
              optionValue,
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
