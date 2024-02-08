import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import PostQAnswer from "./post-q-answer"
import PostQCard from "./post-q-card"
import PostQHeader from "./post-q-header"
import QuestionWrapper from "./question-wrapper"

const postQConfig = {
	score: 300,
	infoCard: {
		image: "/placeholder.png",
		description:
			"The Taj Mahal, a UNESCO World Heritage Site, was built during the reign of which Mughal emperor",
	},
}

const Icon = ({ isAbaHappy }: { isAbaHappy: boolean }) => (
	<>
		{isAbaHappy ? (
			<Icons.happyAba className="top-[-40px] absolute right-0" />
		) : (
			<Icons.sadAba className="top-[-20px] absolute right-0" />
		)}
	</>
)

const PostQ = () => {
	const isAbaHappy = postQConfig.score !== 0

	return (
		<>
			<QuestionWrapper
				className={cn("mt-11 mb-[200px] overflow-visible")}
			>
				<Icon isAbaHappy={isAbaHappy} />
				<PostQHeader score={postQConfig.score} />
				<PostQCard {...postQConfig.infoCard} />
			</QuestionWrapper>
			<PostQAnswer />
		</>
	)
}

export default PostQ
