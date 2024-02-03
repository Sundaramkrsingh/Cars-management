"use client"

import { useState } from "react"
import InQAnswer from "./in-q-answer"
import InQOptions from "./in-q-options"
import QuestionWrapper from "./question-wrapper"
import AnswerDialogue from "./answer-dialogue"

export type Validity = "correct" | "wrong" | "default"
export type OptionCatagories = "partial" | "full"

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

export type Answer = {
	selectedOption?: { label: string; value: string }
	optionValue?: "A" | "B" | "C" | "D"
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
			<QuestionWrapper className="mt-5">
				<InQOptions questionConfig={questionConfig} />
			</QuestionWrapper>
			<AnswerDialogue {...answer} validity={answerValidity} />
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
