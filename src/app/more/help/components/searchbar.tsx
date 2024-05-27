"use client"

import { Icons } from "@/components/icons"

type SearchBarProps = {
  placeholder: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-full h-[44px] bg-[#034757] rounded-[8px] px-4 placeholder:text-white focus-visible:outline-none"
        onChange={props.handleSearch}
      />
      <Icons.search className="cursor-pointer absolute right-[12px] top-[12px] w-[20px] h-[20px]" />
    </div>
  )
}

export default SearchBar
