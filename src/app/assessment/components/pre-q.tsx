"use client"

import { Icons } from "@/components/icons"
import { useChat } from "@/store/ChatProvider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Foresight, PowerUps, WildCards } from "../components"
import AssessmentButton from "./assessment-button"
import QuestionWrapper from "./question-wrapper"
import TransitionWrapper from "./transition-wrapper"

export const PreQ = ({ questionnaire }: { questionnaire: number }) => {
	const {
		chat: { activeQuestionnaire, currentStage, activeQState },
		setCurrentStage,
		setActiveQState,
	} = useChat()((state) => state)

	const router = useRouter()

	const [showPreQ, setShowPreQ] = useState(false)

	useEffect(() => {
		activeQuestionnaire === questionnaire &&
			setActiveQState(`pre-q-${questionnaire}`)
	}, [])

	useEffect(() => {
		router.push(`#pre-q-${questionnaire}`)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPreQ])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowPreQ(activeQState.includes(`pre-q-${questionnaire}`))
		}, 500)

		return () => clearTimeout(timeout)
	}, [activeQState, questionnaire])

	const handelClick = () => {
		setActiveQState(`in-q-${questionnaire}`)
		router.push(`#in-q-${questionnaire}`)
		setCurrentStage("in-q")
	}

	return (
		<TransitionWrapper
			className="mt-5"
			show={showPreQ}
			id={`pre-q-${questionnaire}`}
		>
			<Icons.info className="text-philippine-silver w-4 h-4 mb-2" />
			<QuestionWrapper>
				<Foresight />
				<PowerUps questionnaire={questionnaire} />
				<WildCards questionnaire={questionnaire} />
			</QuestionWrapper>
			{currentStage === "pre-q" && (
				<AssessmentButton onClick={handelClick} />
			)}
		</TransitionWrapper>
	)
}
