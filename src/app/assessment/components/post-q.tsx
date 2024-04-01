import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
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
      "Delhi, India's capital, boasts a rich history as the seat of ancient kingdoms, including the Pandavas and Mughals. Rebuilt by various rulers",
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
    chat: {
      activeQState,
      currentStage,
      activeQuestionnaire,
      answers,
      feedback: { comment },
    },
  } = useChat()((state) => state)

  const [showPostQ, setShowPostQ] = useState(false)

  useEffect(() => {
    if (activeQState.includes(`post-q-${questionnaire}`)) {
      setShowPostQ(true)
    }
  }, [activeQState, questionnaire, showPostQ])

  const answerStatus = answers[questionnaire as keyof typeof answers]

  const isAbaHappy = answerStatus === "correct"

  return (
    <>
      <TransitionWrapper show={showPostQ} id={`post-q-${questionnaire}`}>
        <QuestionWrapper
          feedback
          className={cn(
            "mt-11  overflow-visible",
            activeQuestionnaire === questionnaire &&
              currentStage === "post-q" &&
              !comment &&
              "mb-[200px]"
          )}
        >
          <Icon isAbaHappy={isAbaHappy} />
          <PostQHeader
            isAbaHappy={isAbaHappy}
            answerStatus={answerStatus}
            score={postQConfig.score}
          />
          <PostQCard {...postQConfig.infoCard} />
        </QuestionWrapper>
        {currentStage === "post-q" && (
          <PostQAnswer questionnaire={questionnaire} />
        )}
      </TransitionWrapper>
      {comment && (
        <div
          id="feedback"
          className={cn(
            "!mt-10 w-full flex justify-end my-5 transition-all duration-500 mb-[200px]"
          )}
        >
          <div
            className={cn(
              "bg-aero-blue p-4 min-w-[220px] rounded-b-2xl rounded-tl-2xl overflow-hidden flex gap-2 justify-start items-center z-10"
            )}
          >
            <Icons.check className="w-6 h-6 ml-2" />
            <p className="text-black font-medium text-base">
              Feedback received
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default PostQ
