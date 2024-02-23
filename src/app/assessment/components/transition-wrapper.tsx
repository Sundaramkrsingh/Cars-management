import { cn } from "@/lib/utils"

const TransitionWrapper = ({
  children,
  show,
  id,
  className,
}: {
  children: React.ReactNode
  id: string
  className?: string
  show?: boolean
}) => (
  <div
    id={id}
    className={cn(
      className,
      "transition-all duration-500 scroll-mx-5",
      show ? "opacity-100 visible" : "opacity-0 invisible absolute top-0"
    )}
  >
    {children}
  </div>
)

export default TransitionWrapper
