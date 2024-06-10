"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RankerCard from "./ranker-card"
import { useRankingsData } from "@/store/ranking-provider"
import { Skeleton } from "@/components/ui/skeleton"

type RankConfig = {
  avatar: string
  stars: string
  rank: number
  name: string
  href: string
}

const TopRankers = ({
  type,
  setType,
  isSuccess,
}: {
  type: string
  setType: any
  isSuccess: boolean
}) => {
  const { rankingsData } = useRankingsData()((state) => state)

  const rankConfig: RankConfig[] = rankingsData.rankingData.map((data) => {
    return {
      rank: data.rank || 0,
      avatar: data.avatarLink,
      stars: String(data.netScore || 0),
      name: String(data.firstName || "unknown"),
      href: "#",
    }
  })

  const reorderRankConfig = (config: RankConfig[]) => {
    const topRankers = config.filter((data) => data.rank <= 3)
    const rank2 = topRankers.find((data) => data.rank === 2)
    const rank1 = topRankers.find((data) => data.rank === 1)
    const rank3 = topRankers.find((data) => data.rank === 3)
    return [rank2, rank1, rank3].filter((data): data is RankConfig => !!data)
  }

  const reorderedRankConfig = reorderRankConfig(rankConfig)

  return (
    <Tabs defaultValue={type}>
      <div className="flex w-full gap-2 items-center justify-center">
        <TabsList>
          <TabsTrigger
            className="w-[158px]"
            onClick={() => setType("my-team")}
            value="my-team"
          >
            My Teams
          </TabsTrigger>
          <TabsTrigger
            className="w-[158px]"
            onClick={() => setType("overall")}
            value="overall"
          >
            Overall
          </TabsTrigger>
        </TabsList>
        {/* <button className="w-11 h-10 rounded-lg bg-eagle-green flex justify-center items-center">
          <Icons.filter />
        </button> */}
      </div>

      <TabsContent value="my-team">
        {/* <div className="flex gap-[10px] justify-center items-end mt-4">
          {reorderedRankConfig.map((data, idx) => (
            <RankerCard key={idx} {...data} />
          ))}
        </div> */}
      </TabsContent>
      <TabsContent value="overall">
        <div className="flex gap-[10px] justify-center items-end mt-4">
          {isSuccess ? (
            reorderedRankConfig.map((data, idx) => (
              <RankerCard key={idx} {...data} />
            ))
          ) : (
            <>
              <Skeleton className="relative py-[10px] flex flex-col w-[100px] h-[115px] items-center bg-white rounded-lg" />
              <Skeleton className="relative py-[10px] flex flex-col w-[100px] h-[125px] items-center bg-white rounded-lg" />
              <Skeleton className="relative py-[10px] flex flex-col w-[100px] h-[115px] items-center bg-white rounded-lg" />
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default TopRankers
