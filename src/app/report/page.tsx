import SummaryCard from "./components/summary-card"

const progressionSummaryConfig = {
	heading: "Progression summary",
	subHeading: "8 more sessions for s16",
	progress: 40,
	stage: "S15",
	stats: [
		{ title: "Max streak", value: "25 days" },
		{ title: "Total prog.", value: "62%" },
		{ title: "Attempted", value: "92 Qs" },
	],
}

const performanceSummaryConfig = {
	heading: "Performance summary",
	subHeading: "Get to 90% accuracy for G8",
	progress: 70,
	stage: "G7",
	stats: [
		{ title: "Net score", value: "6,34,678" },
		{ title: "Percentile", value: "Top 56" },
		{ title: "Accuracy", value: "76%" },
	],
}

export default async function Report() {
	return (
		<div className="text-black flex flex-col gap-5 bg-alice-blue pb-[84px]">
			<SummaryCard {...progressionSummaryConfig} />
			<SummaryCard {...performanceSummaryConfig} />
		</div>
	)
}
