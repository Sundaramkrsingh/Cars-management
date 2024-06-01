"use client"

import { useRankingsData } from "@/store/ranking-provider"
import RankBar from "./components/rank-bar"
import RankingPlaceholder from "./components/ranking-placeholder"
import { useRanking } from "@/query/ranking"
import Header from "./components/header"
import MyRank from "./components/my-rank"
import { parseAsString, useQueryState } from "nuqs"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/store/user-provider"
import { Icons } from "@/components/icons"

type RankConfig = {
  rank: number
  avatar: string
  stars: string
  name: string
  stage: string
  href: string
}

export default function Rankings() {
  const { rankingsData } = useRankingsData()((state) => state)
  const { user } = useUser()((state) => state)

  const { rankings } = useRanking()

  const isSuccess = !rankings.isLoading

  const rankConfig: RankConfig[] = rankingsData.rankingData
    .filter((data) => data.rank > 3 && data.userId != user.id)
    .map((data) => {
      return {
        rank: data.rank,
        avatar: data.avatarLink,
        stars: String(data.netScore),
        name: data.fullName,
        stage: data.currentStage + data.currentGrade,
        href: "#",
      }
    })

  const [type, setType] = useQueryState(
    "rank-type",
    parseAsString.withDefault("my-team")
  )

  return (
    <>
      {rankings.isError ? (
        <div className="w-full h-[70vh] flex flex-col justify-center items-center text-black  gap-5 bg-alice-blue pb-[70px]">
          <Icons.sadAba className="ml-[-30px] w-52 h-56" />
          <p className="mt-5 text-2xl font-semibold">Failed to fetch data</p>
        </div>
      ) : (
        <div className="bg-alice-blue w-[380px] no-scrollbar h-screen mx-auto relative z-1">
          <Header type={type} setType={setType} isSuccess={isSuccess} />

          {type === "overall" && (
            <>
              <div className="p-5 pt-[276px] text-black flex flex-col gap-3 bg-alice-blue pb-[84px]">
                {isSuccess ? (
                  rankConfig.map(({ ...rest }, idx) => (
                    <RankBar key={idx} {...rest} />
                  ))
                ) : (
                  <div className="flex flex-col gap-5">
                    <Skeleton className="card-shadow px-[10px] h-[54px] w-full bg-white flex items-center rounded-[10px] justify-between" />
                    <Skeleton className="card-shadow px-[10px] h-[54px] w-full bg-white flex items-center rounded-[10px] justify-between" />
                    <Skeleton className="card-shadow px-[10px] h-[54px] w-full bg-white flex items-center rounded-[10px] justify-between" />
                    <Skeleton className="card-shadow px-[10px] h-[54px] w-full bg-white flex items-center rounded-[10px] justify-between" />
                  </div>
                )}
              </div>
              {isSuccess && <MyRank />}
            </>
          )}

          {type === "my-team" && (
            <div className="p-5 pt-[276px] text-black flex flex-col gap-3 bg-alice-blue pb-[84px]">
              <RankingPlaceholder />
            </div>
          )}
        </div>
      )}
    </>
  )
}
