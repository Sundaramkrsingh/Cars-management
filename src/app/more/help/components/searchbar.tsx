"use client"

import { Icons } from "@/components/icons"

const SearchBar = (props: any) => {
  return (
    <>
      <input
        type="text"
        placeholder={props.placeholder}
        className=" w-full h-[44px] bg-[#034757]
         rounded-[8px] px-4 rounded-[8px] placeholder:text-white focus-visible:outline-none"
      />
      <Icons.search className="cursor-pointer absolute  right-[12px] top-[12px] bm-[12px] w-[20px] h-[20px]" />
    </>
  )
}

export default SearchBar
