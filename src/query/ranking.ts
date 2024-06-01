"use client"

import dataProvider from "@/dataProvider"
import { useRankingsData } from "@/store/ranking-provider"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const getRankingsDetails = () => {
  return fetcher.get(`/stat/top-ranking`)
}

const useRankingsDetails = () => {
  const { setRankingData } = useRankingsData().getState()

  return {
    setRankingData,
  }
}

export const useRanking = () => {
  const { setRankingData } = useRankingsDetails()

  const getRankingsKey = () => ["rankings"]

  const rankings = useQuery({
    queryKey: getRankingsKey(),
    queryFn: () => getRankingsDetails(),
  })

  useEffect(() => {
    if (rankings.isSuccess) {
      setRankingData(rankings.data?.data.data)
    }
  }, [rankings.isSuccess, setRankingData])

  return { rankings }
}
