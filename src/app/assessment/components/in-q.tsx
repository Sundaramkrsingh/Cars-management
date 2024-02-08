"use client"

import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction, useState } from "react"
import type { Answer, OptionCatagories, Options, Validity } from "../type"
import AnswerDialogue from "./answer-dialogue"
import InQAnswer from "./in-q-answer"
import InQOptions from "./in-q-options"
import QuestionWrapper from "./question-wrapper"

const questionConfig: {
	questionNumber: number
	questionCount: number
	question: string
	options: { label: string; value: string }[]
} = {
	questionNumber: 2,
	questionCount: 10,
	question:
		"The Taj Mahal, a UNESCO World Heritage Site, was built during the reign of which Mughal emperor",
	options: [
		{ label: "Akbar", value: "akbar" },
		{ label: "Jhangir", value: "jhangir" },
		{ label: "Shah Jahan", value: "shaj-jahan" },
		{ label: "Aurangzeb", value: "aurangzeb" },
	],
}

const InQ = ({ setShowPostQ }: any) => {
	const [answerBarVisibility, setAnswerBarVisibility] =
		useState<boolean>(true)
	const [answer, setAnswer] = useState<Answer>()
	const [activeOption, setActiveOption] = useState<Options>()
	const [answerValidity, setAnswerValidity] = useState<Validity>("default")
	const [optionsCategory, setOptionsCategory] =
		useState<OptionCatagories>("full")
	const [ansDialogueMargin, setAnsDialogueMargin] =
		useState<boolean>(answerBarVisibility)

	return (
		<>
			<QuestionWrapper
				className={cn("mt-5", !activeOption && "mb-[200px]")}
			>
				<InQOptions questionConfig={questionConfig} />
			</QuestionWrapper>
			<AnswerDialogue
				className={cn(ansDialogueMargin && "mb-[200px]")}
				{...answer}
				validity={answerValidity}
			/>
			{answerBarVisibility && (
				<InQAnswer
					setAnswer={setAnswer as Dispatch<SetStateAction<Answer>>}
					setAnswerBarVisibility={setAnswerBarVisibility}
					setActiveOption={setActiveOption}
					activeOption={activeOption}
					options={questionConfig.options}
					setValidity={setAnswerValidity}
					optionsCategory={optionsCategory}
					setShowPostQ={setShowPostQ}
					setAnsDialogueMargin={setAnsDialogueMargin}
					answer={answer}
				/>
			)}
		</>
	)
}

export default InQ
