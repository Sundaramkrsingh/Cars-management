import { cn } from "@/lib/utils"

type CardInfo = {
  className?: string
  children: React.ReactNode
}

const TextCards = ({ children, ...props }: CardInfo) => {
  return (
    <div
      className={cn(
        props.className,
        "mx-[20px] items-center rounded-[10px] p-[18px] mb-[20px] bg-white card-shadow"
      )}
    >
      {children}
    </div>
  )
}

export default TextCards
