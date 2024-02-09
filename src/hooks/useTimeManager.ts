"use client"

import { useChat } from "@/store/ChatProvider"
import { useRouter } from "next/navigation"

const useTimeManager = () => {
	const router = useRouter()

	const {
		chat: { activeQuestionnaire, questionCount },
		setCurrentStage,
		setActiveQState,
		setInQAnswerVisibility,
		setActiveQuestionnaire,
	} = useChat()((state) => state)

	return {
		"pre-q": {
			initialTime: 15,
			onTimeOut: () => {
				setActiveQState(`in-q-${activeQuestionnaire}`)
				router.push(`#in-q-${activeQuestionnaire}`)
				setCurrentStage("in-q")
			},
		},
		"in-q": {
			initialTime: 20,
			onTimeOut: () => {
				setActiveQState(`post-q-${activeQuestionnaire}`)
				router.push(`#post-q-${activeQuestionnaire}`)
				setCurrentStage("post-q")
				setInQAnswerVisibility(false)
			},
		},
		"post-q": {
			initialTime: 15,
			onTimeOut: () => {
				if (activeQuestionnaire < questionCount) {
					setActiveQState(`pre-q-${1 + activeQuestionnaire}`)
					setActiveQuestionnaire(1 + activeQuestionnaire)
					setCurrentStage("pre-q")
					router.push(`#pre-q-${1 + activeQuestionnaire}`)
				}
			},
		},
	}
}

export default useTimeManager
