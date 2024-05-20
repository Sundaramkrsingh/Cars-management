import { navigateInfo } from "../components/constants"
import NavigateHeader from "../components/navigate-header"
import TextCards from "../help/components/text-cards"
import { legalInfo } from "../help/constant"

const Legal = () => {
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "Legal")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[14px]">
        {legalInfo.map((info) => (
          <TextCards key={info.title}>
            <p className="font-medium text-black text-[20px] mb-[5px]">
              {info.title}
            </p>

            <hr className=" mt-[12px] mb-[16px] border-[1px solid #E6E6E6]" />

            <p className="text-[16px] text-[#333333] text-normal">
              {info.description}
            </p>
          </TextCards>
        ))}
      </div>
    </>
  )
}

export default Legal
