import { Icons } from "@/components/icons"
import Link from "next/link"

type CardInfo = {
  title: string
  link: string
  description?: string
  className?: string
}

const Cards = (props: CardInfo) => {
  return (
    <div className="flex justify-between items-center w-full h-[52px] rounded-[10px] p-[12px] mb-[20px] bg-white  card-shadow">
      <p className="font-normal text-black text-[18px] ">{props.title}</p>
      <Link href={props.link}>
        <Icons.rightArrow className="w-[19px] h-[19px] text-black" />
      </Link>
    </div>
  )
}

export default Cards
