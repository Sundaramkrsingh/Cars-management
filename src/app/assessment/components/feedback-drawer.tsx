import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { TextArea } from "@/components/ui/text-area"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const FeedbackDrawer = ({
  onClick,
  icon,
  className,
}: {
  onClick?: () => void
  icon: "like" | "disLike"
  className: string
}) => {
  const {
    chat: {
      feedback: { comment, intent },
    },
    setFeedback,
  } = useChat()((state) => state)

  const router = useRouter()

  const feedbackForm = useForm({
    mode: "onSubmit",
    defaultValues: comment as any,
  })

  const {
    formState: { isValid },
  } = feedbackForm

  const Icon = Icons[icon]

  return (
    <Drawer>
      <DrawerTrigger>
        <button
          onClick={onClick}
          className={cn(
            "h-full w-14 bg-moonstone-blue flex justify-center items-center text-xl text-dark-slate-gray transition-all duration-500",
            className
          )}
        >
          <Icon className="text-philippine-silver w-4 h-4 cursor-pointer" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="border-none bg-eagle-green p-5">
        <DrawerHeader className="w-full p-0 mb-5">
          <DrawerTitle className="mt-4 font-medium text-white text-left text-lg">
            Feedback about the question
          </DrawerTitle>
        </DrawerHeader>
        <form>
          <TextArea
            name="comment"
            form={feedbackForm}
            placeholder="Add a addressShare any feedback about the question you just attended"
            icon={false}
            className="mb-7 bg-skobeloff placeholder:text-platinum text-platinum focus-visible:outline-none focus-visible:border-eucalyptus focus-visible:bg-skobeloff"
            rules={{ validate: (val) => !!val }}
          />
        </form>
        <DrawerClose>
          <Button
            onClick={() => {
              setFeedback({ intent, ...feedbackForm.getValues() })
              router.push("#feedback")
            }}
            className={cn(
              "cursor-pointer bg-eucalyptus w-full",
              isValid ? "opacity-100" : " opacity-50"
            )}
            label="Continue"
          />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default FeedbackDrawer
