"use client"

import { Icons } from "@/components/icons"
import { Foresight, PowerUps, WildCards } from "../components"
import QuestionWrapper from "./question-wrapper"
import AssessmentButton from "./assessment-button"
import { useRouter } from "next/navigation"

export const PreQ = ({ setShowInQ }: any) => {
	const router = useRouter()

	const handelClick = () => {
		setShowInQ(true)
		router.push("#in-q")
	}

	return (
		<>
			<Icons.info className="text-philippine-silver w-4 h-4 mb-2" />
			<QuestionWrapper>
				<Foresight />
				<PowerUps />
				<WildCards />
			</QuestionWrapper>
			<AssessmentButton onClick={handelClick} />
		</>
	)
}
