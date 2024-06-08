"use client"

import { createContext, useContext, useState } from "react"
import { create } from "zustand"

export type Rankings = {
  rank: number
  avatarLink: string
  userId: number
  fullName: string
  firstName: string
  lastName: string
  userName: string
  gender: string
  city: string
  country: string
  state: string
  currentStage: string
  currentGrade: string
  netScore: number
}

export type RankingsData = {
  rankingData: Rankings[]
}

const initialRankingsData: RankingsData = {
  rankingData: [],
}

const createStore = (initialData: RankingsData) =>
  create<{
    rankingsData: RankingsData
    setRankingData: (data: Rankings[]) => void
  }>((set) => ({
    rankingsData: initialData,
    setRankingData(data: Rankings[]) {
      set((state) => ({
        rankingsData: { ...state.rankingsData, rankingData: data },
      }))
    },
  }))

const RankingsDataContext = createContext<ReturnType<
  typeof createStore
> | null>(null)

export const useRankingsData = () => {
  const context = useContext(RankingsDataContext)
  if (!context) {
    throw new Error(
      "useRankingsData must be used within a RankingsDataProvider"
    )
  }
  return context
}

const RankingsDataProvider = ({
  rankingsData = initialRankingsData,
  children,
}: {
  rankingsData?: RankingsData
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(rankingsData))

  return (
    <RankingsDataContext.Provider value={store}>
      {children}
    </RankingsDataContext.Provider>
  )
}

export default RankingsDataProvider
