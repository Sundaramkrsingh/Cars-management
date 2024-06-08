"use client"

import Header from "./components/header"
import Footer from "./components/footer"
import Cards from "./components/cards"
import { helpInfo } from "./constant"
import { useState } from "react"
import { Icons } from "@/components/icons"

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredHelpInfo = helpInfo.filter((info) =>
    info.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <>
      <Header
        heading={"Help"}
        link={"/more"}
        searchText={"How can we help you?"}
        handleSearch={handleSearch}
      />
      <div className="ml-[20px] mr-[19px] mt-[170px] min-h-screen overflow-y-auto no-scrollbar">
        {filteredHelpInfo.map((info) => (
          <Cards key={info.title} {...info} />
        ))}
        {filteredHelpInfo.length === 0 && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <Icons.sadAba className="ml-[-30px] w-30 h-30" />
            <p className="mt-5 text-2xl font-semibold">No Result Found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Help
