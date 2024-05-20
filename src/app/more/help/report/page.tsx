import Cards from "../components/cards"
import Header from "../components/header"
import { reportInfo } from "./components/constant"

const Report = () => {
  return (
    <>
      <Header heading={"My Report"} link={"/more/help"} searchText={"Search"} />
      <div className="ml-[20px] mr-[19px] mt-[20px]">
        {reportInfo.map((info) => (
          <Cards key={info.title} {...info} />
        ))}
      </div>
    </>
  )
}

export default Report
