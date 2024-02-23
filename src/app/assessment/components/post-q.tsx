import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/ChatProvider"
import { useEffect, useState } from "react"
import PostQAnswer from "./post-q-answer"
import PostQCard from "./post-q-card"
import PostQHeader from "./post-q-header"
import QuestionWrapper from "./question-wrapper"
import TransitionWrapper from "./transition-wrapper"

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

const PostQ = ({ questionnaire }: { questionnaire: number }) => {
  const {
    chat: { activeQState, currentStage, activeQuestionnaire },
  } = useChat()((state) => state)

  const [showPostQ, setShowPostQ] = useState(false)

  useEffect(() => {
    if (activeQState.includes(`post-q-${questionnaire}`)) {
      setShowPostQ(true)
    }
  }, [activeQState, questionnaire, showPostQ])

  const isAbaHappy = postQConfig.score !== 0

  return (
    <TransitionWrapper show={showPostQ} id={`post-q-${questionnaire}`}>
      <QuestionWrapper
        className={cn(
          "mt-11  overflow-visible",
          activeQuestionnaire === questionnaire &&
            currentStage === "post-q" &&
            "mb-[200px]"
        )}
      >
        <Icon isAbaHappy={isAbaHappy} />
        <PostQHeader score={postQConfig.score} />
        <PostQCard {...postQConfig.infoCard} />
      </QuestionWrapper>
      {currentStage === "post-q" && (
        <PostQAnswer questionnaire={questionnaire} />
      )}
    </TransitionWrapper>
  )
}

export default PostQ
