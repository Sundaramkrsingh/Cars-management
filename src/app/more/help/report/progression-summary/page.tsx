import { navigateInfo } from "@/app/more/components/constants"
import NavigateHeader from "@/app/more/components/navigate-header"
import TextCards from "../../components/text-cards"
import { progressionSummaryInfo } from "../components/constant"
import { cn } from "@/lib/utils"

const ProgressionSummary = () => {
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "Progression Summary")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[14px]">
        <TextCards>
          <p className="font-medium text-black text-[20px] mb-[5px]">
            {progressionSummaryInfo[0].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {progressionSummaryInfo[0].description}
          </p>
          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {progressionSummaryInfo[1].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {progressionSummaryInfo[1].description}
          </p>
          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {progressionSummaryInfo[2].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {progressionSummaryInfo[2].description}
          </p>
          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {progressionSummaryInfo[3].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {progressionSummaryInfo[3].description}
          </p>

          <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />

          <p className="font-medium text-black text-[20px] mb-[5px]">
            {progressionSummaryInfo[4].title}
          </p>
          <p className="text-[16px] text-[#333333] text-normal">
            {progressionSummaryInfo[4].description}
          </p>
          <div className=" mt-[20px]">
            <div className={cn("flex gap-[2px] mb-[2px] items-center w-full")}>
              {progressionSummaryInfo[4].table?.header.map((val, idx) => (
                <div
                  key={`${val}_${idx}`}
                  className={cn(
                    "h-8 text-white font-semibold rounded-[4px] bg-celadon-green flex items-center py-[5px] pl-[12px] text-nowrap border-[1px solid #F2F2F2]",
                    idx == 0 ? "w-[82px]" : "w-[117px]"
                  )}
                >
                  {val}
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full ">
              {progressionSummaryInfo[4].table?.tableData.map((val, rowIdx) => {
                return (
                  <div
                    className="flex gap-[2px] w-full mb-[2px] text-sm font-normal text-black"
                    key={`${val}_${rowIdx}`}
                  >
                    {Object.values(val).map((itm, idx) => (
                      <div
                        key={`${itm}_${idx}`}
                        className={cn(
                          "h-8 rounded-[4px] flex items-center px-3 text-nowrap border-[1px solid #F2F2F2]",
                          idx == 0 ? "w-[82px] " : "w-[117px]",
                          rowIdx % 2 === 0 ? "bg-aero-blue" : "bg-light-cyan"
                        )}
                      >
                        {itm}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </TextCards>
      </div>
    </>
  )
}

export default ProgressionSummary
