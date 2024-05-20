import { Separator } from "@/components/ui/separator"
import { useChat } from "@/store/chat-provider"

const Mcq = ({ question, options, questionnaire }: any) => {
  const {
    chat: { questionCount },
    setCurrentStage,
    setActiveQState,
  } = useChat()((state) => state)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-platinum">{`Q ${questionnaire + 1} / ${questionCount}`}</p>
      <p className="font-medium">{question}</p>
      <div className="">
        {options.map(({ label, value }: any, idx: number) => {
          return (
            <div key={idx}>
              <div className="flex items-center">
                <div className="mr-2 rounded-lg bg-aero-blue text-foreground min-w-6 min-h-6 flex justify-center items-center">
                  {String.fromCharCode("A".charCodeAt(0) + idx)}
                </div>
                <p className="text-sm font-medium">{label}</p>
              </div>
              {idx !== options.length - 1 && (
                <Separator className="my-4 bg-celadon-green" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Mcq
