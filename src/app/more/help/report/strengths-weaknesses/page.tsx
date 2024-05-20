import { navigateInfo } from "@/app/more/components/constants"
import NavigateHeader from "@/app/more/components/navigate-header"
import TextCards from "../../components/text-cards"
import { strengthsWeaknessesInfo } from "../components/constant"

const StrengthsWeaknesses = () => {
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "Strengths & Weaknesses")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[14px]">
        <TextCards>
          <p className="font-medium text-black text-[20px] mb-[5px]">
            {strengthsWeaknessesInfo[0].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {strengthsWeaknessesInfo[0].description}
          </p>

          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {strengthsWeaknessesInfo[1].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {strengthsWeaknessesInfo[1].description}
          </p>
        </TextCards>
      </div>
    </>
  )
}

export default StrengthsWeaknesses
