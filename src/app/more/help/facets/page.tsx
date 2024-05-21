import { navigateInfo } from "../../components/constants"
import NavigateHeader from "../../components/navigate-header"
import TextCards from "../components/text-cards"
import { facetsInfo } from "../constant"

const Facets = () => {
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "FACETS")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[14px]">
        <TextCards>
          <p className="font-medium text-black text-[20px] mb-[5px]">
            {facetsInfo[0].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {facetsInfo[0].description}
          </p>

          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {facetsInfo[1].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {facetsInfo[1].description}
          </p>
        </TextCards>
      </div>
    </>
  )
}

export default Facets
