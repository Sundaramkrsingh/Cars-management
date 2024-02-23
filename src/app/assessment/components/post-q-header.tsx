import { Icons } from "@/components/icons"

type PostQHeaderProps = {
  score: number
}

const PostQHeader = ({ score }: PostQHeaderProps) => {
  const isAnswerCorrect = score !== 0

  const InCorrectAnswer = () => (
    <div className="flex gap-2 flex-col">
      <p className="text-lg">Oops, that’s okay!</p>
      <p className="text-3xl font-medium">Lets move on</p>
    </div>
  )

  const CorrectAnswer = () => (
    <div className="flex gap-2 flex-col">
      <p className="text-lg">Woohoo you scored</p>
      <div className="text-medium-aquamarine">
        <div className="text-3xl font-medium text-medium-aquamarine flex items-center gap-2">
          <Icons.scoreStar />
          <p>
            <span className="mr-1">{score}</span>
            stars
          </p>
        </div>
      </div>
    </div>
  )

  return <>{isAnswerCorrect ? <CorrectAnswer /> : <InCorrectAnswer />}</>
}

export default PostQHeader
