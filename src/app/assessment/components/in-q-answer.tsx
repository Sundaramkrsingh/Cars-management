"use client"

import { Icons } from "@/components/icons"
import { Dispatch, SetStateAction } from "react"
import type { Answer, OptionCatagories, Validity, Options } from "../type"
import { cn } from "@/lib/utils"

type InQAnswerProps = {
	setAnswerBarVisibility: Dispatch<SetStateAction<boolean>>
	setActiveOption: Dispatch<SetStateAction<Options | undefined>>
	activeOption: Options | undefined
	options: { label: string; value: string }[]
	setValidity: Dispatch<SetStateAction<Validity>>
	optionsCategory: OptionCatagories
	setShowPostQ: any
	setAnsDialogueMargin: Dispatch<SetStateAction<boolean>>
	setAnswer: Dispatch<SetStateAction<Answer>>
	answer: Answer | undefined
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
	setAnswerBarVisibility,
	setActiveOption,
	setAnswer,
	activeOption,
	options,
	setValidity,
	optionsCategory,
	setShowPostQ,
	setAnsDialogueMargin,
	answer,
}: InQAnswerProps) => {
	const isPartial = optionsCategory === "partial"

	const handelClick = (value: Options) => {
		setActiveOption(value)
	}

	const show = () => {
		setTimeout(() => {
			setValidity(
				answer?.selectedOption?.label === "Shah Jahan"
					? "correct"
					: "wrong"
			)
			setAnsDialogueMargin(false)
			setShowPostQ(true)
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
				<Option
					value="B"
					activeOption={activeOption}
					onClick={handelClick}
				/>
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
					const optionIdx =
						activeOption && activeOption?.charCodeAt(0) - 65

					const selectedOption = optionIdx && options[optionIdx]

					if (activeOption && selectedOption) {
						setAnswerBarVisibility(false)
						setAnswer({
							optionValue: activeOption as Options,
							selectedOption,
						})
						show()
					}
				}}
			>
				{!activeOption ? <Icons.disabledLock /> : <Icons.lockAnswer />}
			</button>
		</div>
	)
}

export default InQAnswer
