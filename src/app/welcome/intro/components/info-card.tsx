import { cn } from "@/lib/utils"
import Image from "next/image"

type InfoCardProps = {
  title: string
  description: string
}

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          "relative w-full h-[345px] flex items-center justify-center overflow-hidden"
        )}
      >
        <Image src="/intro.svg" alt="splash" layout="fill" />
      </div>

      <div className="mt-6 flex flex-col justify-center items-center">
        <p className="text-eagle-green text-[28px] font-semibold">{title}</p>
        <p className="max-w-[270px] text-center text-base text-dark-charcoal">
          {description}
        </p>
      </div>
    </div>
  )
}

export default InfoCard
