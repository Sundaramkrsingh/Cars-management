import CompetenciesGradesCard from "./components/competencies-grades-card"
import {
  competenciesGradesCardConfig,
  facetsScoreCardConfig,
  performanceSummaryConfig,
  progressionSummaryConfig,
  strengthWeaknessConfig,
} from "./components/constants"
import FacetsScoreCard from "./components/facets-score-card"
import StrengthWeaknessCard from "./components/strength-weakness-card"
import SummaryCard from "./components/summary-card"

export default async function Report() {
  return (
    <div className="text-black flex flex-col gap-5 bg-alice-blue pb-[70px]">
      <SummaryCard variant="progression" {...progressionSummaryConfig} />
      <SummaryCard variant="performance" {...performanceSummaryConfig} />
      <FacetsScoreCard variant="tier1" {...facetsScoreCardConfig} />
      <StrengthWeaknessCard {...strengthWeaknessConfig} />
      <CompetenciesGradesCard
        variant="tier3"
        {...competenciesGradesCardConfig}
      />
    </div>
  )
}
