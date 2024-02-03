import { Icons } from "@/components/icons"
import { Foresight, PowerUps, WildCards } from "../components"
import QuestionWrapper from "./question-wrapper"
import AssessmentButton from "./assessment-button"

export const PreQ = () => {
	return (
		<>
			<Icons.info className="text-philippine-silver w-4 h-4 mb-2" />
			<QuestionWrapper>
				<Foresight />
				<PowerUps />
				<WildCards />
			</QuestionWrapper>
			<AssessmentButton />
		</>
	)
}
