"use client"

import { useState } from "react"
import Cards from "../components/cards"
import Header from "../components/header"
import { reportInfo } from "./components/constant"
import { Icons } from "@/components/icons"

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredReportInfo = reportInfo.filter((info) =>
    info.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <>
      <Header
        heading={"My Report"}
        link={"/more/help"}
        searchText={"Search"}
        handleSearch={handleSearch}
      />
      <div className="ml-[20px] mr-[19px] mt-[170px]">
        {filteredReportInfo.map((info) => (
          <Cards key={info.title} {...info} />
        ))}
        {filteredReportInfo.length === 0 && (
          <div className="w-full h-[70vh] flex flex-col justify-center items-center">
            <Icons.sadAba className="ml-[-30px] w-30 h-30" />
            <p className="mt-5 text-2xl font-semibold">No Result Found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Report
