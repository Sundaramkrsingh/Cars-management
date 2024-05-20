import Header from "./components/header"
import Footer from "./components/footer"
import Cards from "./components/cards"
import { helpInfo } from "./constant"

const Help = () => {
  return (
    <>
      <Header
        heading={"Help"}
        link={"/more"}
        searchText={"How can we help you?"}
      />
      <div className="ml-[20px] mr-[19px] mt-[20px]">
        {helpInfo.map((info) => (
          <Cards key={info.title} {...info} />
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Help
