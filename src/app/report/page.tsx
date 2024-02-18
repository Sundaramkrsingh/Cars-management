import CompetenciesGradesCard from "./components/competencies-grades-card"
import {
	competenciesGradesCardConfig,
	performanceSummaryConfig,
	progressionSummaryConfig,
	strengthWeaknessConfig,
} from "./components/constants"
import StrengthWeaknessCard from "./components/strength-weakness-card"
import SummaryCard from "./components/summary-card"

export default async function Report() {
	return (
		<div className="text-black flex flex-col gap-5 bg-alice-blue pb-[70px]">
			<SummaryCard {...progressionSummaryConfig} />
			<SummaryCard {...performanceSummaryConfig} />
			<StrengthWeaknessCard {...strengthWeaknessConfig} />
			<CompetenciesGradesCard {...competenciesGradesCardConfig} />
		</div>
	)
}
