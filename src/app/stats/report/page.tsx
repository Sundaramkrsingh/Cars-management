"use client"

import { useReportsData } from "@/store/reports-provider"
import CompetenciesGradesCard from "./components/competencies-grades-card"
import {
  competenciesGradesCardConfig,
  strengthWeaknessConfig,
} from "./components/constants"
import FacetsScoreCard from "./components/facets-score-card"
import StrengthWeaknessCard from "./components/strength-weakness-card"
import SummaryCard from "./components/summary-card"
import { useFacetsReports } from "@/query/facets-reports"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

export default function Report() {
  const { reportsData } = useReportsData()((state) => state)

  const { reports } = useFacetsReports()

  const progressionSummary = {
    heading: "Progression summary",
    subHeading: `${reportsData.progressionSummary.currentSession}/${reportsData.progressionSummary.totalSession} sessions completed in ${reportsData.progressionSummary.currentStage}`,
    progress: reportsData.progressionSummary.totalProgress,
    description: "Total prog.",
    stats: [
      {
        title: "Current Stage",
        value: `${reportsData.progressionSummary.currentStage}`,
      },
      {
        title: "Attempted",
        value: `${reportsData.progressionSummary.questionAttempted} Qs`,
      },
    ],
  }
  const performanceSummary = {
    heading: "Performance summary",
    subHeading: `Get to ${reportsData.performanceSummary.nextGradeAccuracy}% accuracy for ${reportsData.performanceSummary.nextGrade}`,
    progress: reportsData.performanceSummary.currentAccuracy,
    description: "Current Accuracy",
    stats: [
      {
        title: "Net score",
        value: reportsData.performanceSummary.netScore.toString(),
      },
      {
        title: "Percentile",
        value: `Top ${reportsData.performanceSummary.percentile}`,
      },
      {
        title: "Accuracy",
        value: `${reportsData.performanceSummary.currentAccuracy}%`,
      },
    ],
  }
  const scoreSummary = {
    heading: "Tier 1",
    subHeading: "FACETS Score",
    info: "info",
    facetsScoreGraphConfig: {
      labels: reportsData.scoreSummary.tier1.map(
        (f) => ` ${f.name.toUpperCase()},${f.grade.toUpperCase()}`
      ),
      datasets: [
        {
          label: "Score",
          data: reportsData.scoreSummary.tier1.map((f) => f.score ?? null),
          backgroundColor: "rgba(135,220,205,0.2)",
          borderColor: "rgba(135,220,205,1)",
          borderWidth: 1,
        },
      ],
    },
  }
  const competenciesGradesSummary = {
    heading: "Tier 3",
    subHeading: "Competencies & Grades",
    info: "info",
    competenceInfo: reportsData.competencyAndGrades.tier3,
  }

  return (
    <div className="text-black flex flex-col gap-5 bg-alice-blue pb-[70px]">
      {reports?.isLoading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[415px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[415px] w-full rounded-xl" />{" "}
          <Skeleton className="h-[415px] w-full rounded-xl" />
        </div>
      ) : (
        <>
          {reports?.isError ? (
            <div className="w-full h-[70vh] flex flex-col justify-center items-center">
              <Icons.sadAba className="ml-[-30px] w-52 h-56" />
              <p className="mt-5 text-2xl font-semibold">
                Failed to fetch data
              </p>
            </div>
          ) : (
            <>
              <SummaryCard variant="progression" {...progressionSummary} />
              <SummaryCard variant="performance" {...performanceSummary} />
              <FacetsScoreCard variant="tier1" {...scoreSummary} />{" "}
              <StrengthWeaknessCard {...strengthWeaknessConfig} />
              <CompetenciesGradesCard
                variant="tier3"
                {...competenciesGradesSummary}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
