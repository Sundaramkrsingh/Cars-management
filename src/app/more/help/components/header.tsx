import { Icons } from "@/components/icons"
import Link from "next/link"
import SearchBar from "./searchbar"

type HeadingProps = {
  heading: string
  link: string
  searchText: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = (props: HeadingProps) => {
  return (
    <div className="fixed top-0 w-[380px] bg-stats overflow-hidden bg-[center_top_60px] no-scrollbar text-primary rounded-b-[32px] bg-no-repeat">
      <div className="h-[66px] w-[360px] flex items-center pl-[20px]">
        <Link href={props.link}>
          <Icons.leftArrow className="w-7 h-7 mr-[6px]" />
        </Link>
        <h1 className="font-medium text-lg">{props.heading}</h1>
      </div>
      <div className="flex items-center relative justify-center mt-[8px] mx-[20px] mb-[34px]">
        <SearchBar
          placeholder={props.searchText}
          handleSearch={props.handleSearch}
        />
      </div>
    </div>
  )
}

export default Header
