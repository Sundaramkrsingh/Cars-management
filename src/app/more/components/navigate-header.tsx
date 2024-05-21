import { Icons } from "@/components/icons"
import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

type NavigateHeaderProp = {
  title: string
  link?: string
  className?: string
}

const NavigateHeader = (props: NavigateHeaderProp) => {
  return (
    <div className="h-[66px] w-[360px] flex items-center text-black ">
      <Link href={props.link as Url}>
        <Icons.leftArrow className="w-7 h-7 ml-[20px] mr-[6px]" />
      </Link>
      <p className="text-medium text-[18px] leading-7">{props.title}</p>
    </div>
  )
}

export default NavigateHeader
