"use client"

import { createContext, useContext, useState } from "react"
import { create } from "zustand"

export type ProgressionSummary = {
  currentStage?: string
  questionAttempted?: number
  currentSession?: number
  totalSession?: number
  totalProgress?: number
}

export type PerformanceSummary = {
  currentGrade?: string
  percentile?: number
  netScore?: number
  currentAccuracy?: number
  nextGrade?: string
  nextGradeAccuracy?: number
}

export type ScoreSummary = {
  tier1: {
    name: string
    score?: number
    grade?: string | "NA"
  }[]
}

export type ReportsData = {
  progressionSummary: ProgressionSummary
  performanceSummary: PerformanceSummary
  scoreSummary: ScoreSummary
}

const initialReportsData: ReportsData = {
  progressionSummary: {
    currentStage: "",
    questionAttempted: 0,
    currentSession: 0,
    totalSession: 0,
    totalProgress: 0,
  },
  performanceSummary: {
    currentGrade: "",
    percentile: 0,
    netScore: 0,
    currentAccuracy: 0,
    nextGrade: "",
    nextGradeAccuracy: 0,
  },
  scoreSummary: {
    tier1: [
      { name: "Flair Series", score: 0, grade: "" },
      { name: "Asset Series", score: 0, grade: "" },
      { name: "Craft Series", score: 0, grade: "" },
      { name: "Extra Series", score: 0, grade: "" },
      { name: "Trait Series", grade: "NA" },
      { name: "Skill Series", score: 0, grade: "" },
    ],
  },
}

const createStore = (initialData: ReportsData) =>
  create<{
    reportsData: ReportsData
    setProgressionSummary: (data: ProgressionSummary) => void
    setPerformanceSummary: (data: PerformanceSummary) => void
    setScoreSummary: (data: ScoreSummary) => void
  }>((set) => ({
    reportsData: initialData,
    setProgressionSummary(data: ProgressionSummary) {
      set((state) => ({
        reportsData: { ...state.reportsData, progressionSummary: data },
      }))
    },
    setPerformanceSummary(data: PerformanceSummary) {
      set((state) => ({
        reportsData: { ...state.reportsData, performanceSummary: data },
      }))
    },
    setScoreSummary(data: ScoreSummary) {
      set((state) => ({
        reportsData: { ...state.reportsData, scoreSummary: data },
      }))
    },
  }))

const ReportsDataContext = createContext<ReturnType<typeof createStore> | null>(
  null
)

export const useReportsData = () => {
  if (!ReportsDataContext) {
    throw new Error("useReportsData must be used within a ReportsDataProvider")
  }
  return useContext(ReportsDataContext)
}

const ReportsDataProvider = ({
  reportsData = initialReportsData,
  children,
}: {
  reportsData?: ReportsData
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(reportsData))

  return (
    <ReportsDataContext.Provider value={store}>
      {children}
    </ReportsDataContext.Provider>
  )
}

export default ReportsDataProvider
