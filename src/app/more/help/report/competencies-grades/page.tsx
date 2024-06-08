import { navigateInfo } from "@/app/more/components/constants"
import NavigateHeader from "@/app/more/components/navigate-header"
import TextCards from "../../components/text-cards"
import { CompetenciesGradesInfo } from "../components/constant"

const CompetenciesGrades = () => {
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "Competencies & Grades")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[14px]">
        <TextCards>
          <p className="font-medium text-black text-[20px] mb-[5px]">
            {CompetenciesGradesInfo[0].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {CompetenciesGradesInfo[0].description}
          </p>

          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {CompetenciesGradesInfo[1].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {CompetenciesGradesInfo[1].description}
          </p>
        </TextCards>
      </div>
    </>
  )
}

export default CompetenciesGrades
