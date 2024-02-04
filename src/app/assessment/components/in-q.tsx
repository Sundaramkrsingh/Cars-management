"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Answer, OptionCatagories, Validity } from "../type"
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

const InQ = () => {
	const [answerBarVisibility, setAnswerBarVisibility] =
		useState<boolean>(true)
	const [answer, setAnswer] = useState<Answer>({})
	const [activeOption, setActiveOption] = useState<string>("")
	const [answerValidity, setAnswerValidity] = useState<Validity>("default")
	const [optionsCategory, setOptionsCategory] =
		useState<OptionCatagories>("full")

	return (
		<>
			<QuestionWrapper
				className={cn("mt-5", !activeOption && "mb-[200px]")}
			>
				<InQOptions questionConfig={questionConfig} />
			</QuestionWrapper>
			<AnswerDialogue
				{...answer}
				validity={answerValidity}
				className={cn(activeOption && "mb-[200px]")}
			/>
			{answerBarVisibility && (
				<InQAnswer
					setAnswer={setAnswer}
					setAnswerBarVisibility={setAnswerBarVisibility}
					setActiveOption={setActiveOption}
					activeOption={activeOption}
					options={questionConfig.options}
					setValidity={setAnswerValidity}
					optionsCategory={optionsCategory}
				/>
			)}
		</>
	)
}

export default InQ
