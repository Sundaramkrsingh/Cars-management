import { Icons } from "@/components/icons"
import Link from "next/link"
import SearchBar from "./searchbar"

type HeadingProps = {
  heading: string
  link: string
  searchText: string
}
const Header = (props: HeadingProps) => {
  return (
    <div className=" bg-stats w-inherit overflow-hidden bg-fixed bg-[center_top_60px] overflow-y-scroll no-scrollbar bg-red-50 text-primary  w-full rounded-b-[32px] bg-no-repeat">
      <div className="h-[66px] w-[360px] flex items-center pl-[20px]">
        <Link href={props.link}>
          <Icons.leftArrow className="w-7 h-7 mr-[6px]" />
        </Link>
        <h1 className="font-medium text-lg">{props.heading}</h1>
      </div>
      <div className="flex items-center relative justify-center mt-[8px] mx-[20px] mb-[34px]">
        <SearchBar placeholder={props.searchText} />
      </div>
    </div>
  )
}

export default Header
