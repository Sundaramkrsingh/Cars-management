"use client"

import { Icons } from "@/components/icons"
import { Dispatch, SetStateAction } from "react"
import { Answer, OptionCatagories, Validity } from "./in-q"

type Options = "A" | "B" | "C" | "D"

type InQAnswerProps = {
	setAnswerBarVisibility: Dispatch<SetStateAction<boolean>>
	setActiveOption: Dispatch<SetStateAction<string>>
	setAnswer: Dispatch<SetStateAction<Answer>>
	activeOption: string
	options: { label: string; value: string }[]
	setValidity: Dispatch<SetStateAction<Validity>>
	optionsCategory: OptionCatagories
}

const Option = ({
	value,
	className,
	onClick,
	activeOption,
}: {
	value: "A" | "B" | "C" | "D"
	onClick: (value: "A" | "B" | "C" | "D") => void
	activeOption: string
	className?: string
}) => {
	const activeClass = "!text-white !bg-eucalyptus"

	return (
		<button
			onClick={() => onClick(value)}
			className={`${
				activeOption === value && activeClass
			} ${className} h-full w-1/4 bg-white border flex justify-center items-center text-xl text-dark-slate-gray border-celadon-green transition-all duration-500`}
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
}: InQAnswerProps) => {
	const isPartial = optionsCategory === "partial"

	const handelClick = (value: Options) => {
		const selectedOption = options[value.charCodeAt(0) - 65]

		setActiveOption(value)
		setAnswer({
			optionValue: value,
			selectedOption,
		})
	}

	return (
		<div className="w-full fixed bottom-5 left-5">
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
				className={`${
					!activeOption && "!bg-chinese-silver"
				} h-14 w-14 play-button fixed bottom-5 right-5`}
				onClick={() => {
					if (activeOption) {
						setAnswerBarVisibility(false)
					}
				}}
			>
				{!activeOption ? <Icons.disabledLock /> : <Icons.lockAnswer />}
			</button>
		</div>
	)
}

export default InQAnswer
