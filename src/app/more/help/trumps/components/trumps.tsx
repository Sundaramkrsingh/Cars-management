"use client"

import { Icons } from "@/components/icons"
import TextCards from "../../components/text-cards"

type TrumpsData = {
  title: string
  heading: string
  description: string
  tierData?: {
    tier1Name: string
    tier2Name: string
    tierDescription: string
  }
  factorsData: {
    heading: string
    icon: any
    description: string
  }[]
}

const ForesightsRenderer = ({ trumpData }: { trumpData: TrumpsData }) => {
  return (
    <div className="mt-[14px] ">
      <TextCards>
        <p className="font-medium text-black text-[20px] mb-[5px]">
          {trumpData.heading}
        </p>
        <p className="text-[16px] text-[#333333] text-normal">
          {trumpData.description}
        </p>
        <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />
        <div className="flex">
          <div className="rounded-full w-[36px] h-[36px] bg-[#FDE68A] px-[9px] py-[6px]">
            <p className="font-semibold text-center text-[#014455] text-[15px]">
              FS
            </p>
          </div>
          <div className="text-[#0D0D0D] text-[16px] text-medium text-[16px]">
            <p className="flex items-center gap-[10px]">
              <Icons.rightArrow className="w-[14px] h-[14px] ml-[20px] mr-[6px]" />
              {trumpData.tierData?.tier1Name}
            </p>
            <p className="flex items-center gap-[10px]">
              <Icons.rightArrow className="w-[14px] h-[14px] ml-[20px] mr-[6px]" />
              {trumpData.tierData?.tier2Name}
            </p>
          </div>
        </div>
        <div className="mt-[22px] text-[#333333]">
          <p>{trumpData.tierData?.tierDescription}</p>
        </div>
        <div className="mt-[22px]">
          {trumpData.factorsData.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="mb-[32px]">
                <div className="flex items-center gap-[6px]">
                  <p className="font-semibold text-[#333333] text-[18px] mb-[px]">
                    {item.heading}
                  </p>
                  <Icon />
                </div>
                <p className="text-[16px] text-[#333333] text-normal">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </TextCards>
    </div>
  )
}

const PowerupsRenderer = ({ trumpData }: { trumpData: TrumpsData }) => {
  return (
    <div className="mt-[14px]">
      <TextCards>
        <p className="font-medium text-black text-[20px] mb-[5px]">
          {trumpData.heading}
        </p>
        <p className="text-[16px] text-[#333333] text-normal">
          {trumpData.description}
        </p>
        <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />
        <div className="mt-[32px]">
          {trumpData.factorsData.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-[11px] mb-[36px]"
              >
                <div className="bg-[#DFF6F2] w-[59px] h-[59px] rounded-[9px] flex items-center justify-center">
                  <Icon />
                </div>
                <div className="w-[223px]">
                  <p className="font-semibold text-[#333333] text-[18px] mb-[px]">
                    {item.heading}
                  </p>
                  <p className="text-[16px] text-[#333333] text-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </TextCards>
    </div>
  )
}

const WildCardsRenderer = ({ trumpData }: { trumpData: TrumpsData }) => {
  return (
    <div className="mt-[14px]">
      <TextCards>
        <p className="font-medium text-black text-[20px] mb-[5px]">
          {trumpData.heading}
        </p>
        <p className="text-[16px] text-[#333333] text-normal">
          {trumpData.description}
        </p>
        <hr className=" mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />
        <div className="mt-[32px]">
          {trumpData.factorsData.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-center gap-[11px] mb-[36px]"
              >
                <div className="bg-[#DFF6F2] w-[59px] h-[59px] rounded-[9px] flex items-center justify-center">
                  <Icon />
                </div>
                <div className="w-[223px]">
                  <p className="font-semibold text-[#333333] text-[18px] mb-[px]">
                    {item.heading}
                  </p>
                  <p className="text-[16px] text-[#333333] text-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </TextCards>
    </div>
  )
}
const TrumpsHolder = ({ trumpData }: { trumpData: TrumpsData }) => {
  return (
    <>
      {trumpData.title === "Foresights" && (
        <ForesightsRenderer trumpData={trumpData} />
      )}

      {trumpData.title === "Powerups" && (
        <PowerupsRenderer trumpData={trumpData} />
      )}

      {trumpData.title === "WildCards" && (
        <WildCardsRenderer trumpData={trumpData} />
      )}
    </>
  )
}

export default TrumpsHolder
