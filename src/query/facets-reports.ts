"use client"

import dataProvider from "@/dataProvider"
import { useReportsData } from "@/store/reports-provider"
import { useUser } from "@/store/user-provider"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const getProgressionSummary = (userId: string | number) => {
  return fetcher.get(`/reports/${userId}/progression-summary`)
}

const getPerformanceSummary = (userId: string | number) => {
  return fetcher.get(`/reports/${userId}/performance-summary`)
}

const getScoreSummary = (userId: string | number) => {
  return fetcher.get(`/reports/${userId}/score-summary`)
}

const useReportDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  const { setPerformanceSummary, setProgressionSummary, setScoreSummary } =
    useReportsData()((state) => state)

  return { id, setPerformanceSummary, setProgressionSummary, setScoreSummary }
}

export const useFacetsReports = () => {
  const { id, setPerformanceSummary, setProgressionSummary, setScoreSummary } =
    useReportDetails()

  const getReportKey = () => ["reports"]

  const reports = useQuery({
    queryKey: getReportKey(),
    queryFn: async () => {
      const [progression, performance, score] = await Promise.all([
        getProgressionSummary(id),
        getPerformanceSummary(id),
        getScoreSummary(id),
      ])
      return { progression, performance, score }
    },
  })

  useEffect(() => {
    if (reports.isSuccess) {
      const { progression, performance, score } = reports.data as any

      setProgressionSummary({ ...progression })
      setPerformanceSummary({ ...performance })
      setScoreSummary({ ...score })
    }
  }, [
    reports.isSuccess,
    reports.data,
    setPerformanceSummary,
    setProgressionSummary,
    setScoreSummary,
  ])

  return { reports }
}
