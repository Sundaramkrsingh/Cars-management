"use client"

import { Icons } from "@/components/icons"
import { useRankingsData } from "@/store/ranking-provider"
import { useUser } from "@/store/user-provider"
import Image from "next/image"

const MyRank = () => {
  const { rankingsData } = useRankingsData()((state) => state)
  const { user } = useUser()((state) => state)

  const userRanking = rankingsData.rankingData.find(
    (data) => data.userId === user.id
  )

  const rank = userRanking?.rank
  const avatar = userRanking?.avatarLink
  const stars = userRanking?.netScore
  const stage_grade = userRanking
    ? userRanking.currentStage + userRanking.currentGrade
    : null

  return (
    <div className="p-5 fixed w-inherit bottom-0 bg-aero-blue h-16 flex justify-between my-rank-shadow rounded-t-[10px] items-center">
      <div className="flex items-center">
        <div className="bg-middle-blue-green rounded-[10px] font-medium text-dark-charcoal text-sm py-1 px-[6px] mr-3">
          {rank}
        </div>
        <div className="rounded-full overflow-hidden border w-7 h-7 relative border-eucalyptus mr-[6px]">
          {avatar ? (
            <Image src={avatar} alt={avatar} layout="fill" />
          ) : (
            <div className="justify-center items-center flex  h-full">
              <Icons.user />
            </div>
          )}
        </div>
        <div className="ml-[8px]">
          <p className="font-medium text-[20px] text-eerie-black">You</p>
          <p className="font-normal text-[14px] text-[#00667F]">
            {stage_grade}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Icons.myRankStarnew />
        <p className="font-medium text-lg text-eerie-black">{stars}</p>
      </div>
    </div>
  )
}

export default MyRank
