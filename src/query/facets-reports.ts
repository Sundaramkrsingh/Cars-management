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

const getCompetencyAndGradesSummary = (userId: string | number) => {
  return fetcher.get(`/reports/${userId}/competencies-grades-summary`)
}

const useReportDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  const {
    setPerformanceSummary,
    setProgressionSummary,
    setScoreSummary,
    setCompetencyAndGrades,
  } = useReportsData()((state) => state)

  return {
    id,
    setPerformanceSummary,
    setProgressionSummary,
    setScoreSummary,
    setCompetencyAndGrades,
  }
}

export const useFacetsReports = () => {
  const {
    id,
    setPerformanceSummary,
    setProgressionSummary,
    setScoreSummary,
    setCompetencyAndGrades,
  } = useReportDetails()

  const getReportKey = () => ["reports"]

  const reports = useQuery({
    queryKey: getReportKey(),
    queryFn: async () => {
      const [progression, performance, score, competenciesandgrade] =
        await Promise.all([
          getProgressionSummary(id),
          getPerformanceSummary(id),
          getScoreSummary(id),
          getCompetencyAndGradesSummary(id),
        ])
      return { progression, performance, score, competenciesandgrade }
    },
  })

  useEffect(() => {
    if (reports.isSuccess) {
      const { progression, performance, score, competenciesandgrade } =
        reports.data as any

      setProgressionSummary({ ...progression.data.data })
      setPerformanceSummary({ ...performance.data.data })
      setScoreSummary({ ...score.data.data })
      setCompetencyAndGrades({ ...competenciesandgrade.data.data })
    }
  }, [
    reports.isSuccess,
    reports.data,
    setPerformanceSummary,
    setProgressionSummary,
    setScoreSummary,
    setCompetencyAndGrades,
  ])

  return { reports }
}
