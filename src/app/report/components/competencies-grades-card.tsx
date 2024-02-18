import React from "react"
import Card from "./card"
import { cn } from "@/lib/utils"

const competenceConfig = [
	{
		title: "Grade 8 (Above 90%)",
		data: [
			{ label: "Networking Skills", variant: "green" },
			{ label: "Networking Skills", variant: "yellow" },
			{ label: "Contextual Vocabulary", variant: "blue" },
			{ label: "Probability & Statistic", variant: "green" },
			{ label: "Contextual Vocabulary", variant: "yellow" },
			{ label: "Probability & Statistic", variant: "blue" },
		],
	},
	{
		title: "Grade 7 (70 -90%)",
		data: [
			{ label: "Combinatorics", variant: "blue" },
			{ label: "Artistic Expression", variant: "red" },
			{ label: "Antonyms & Synonyms", variant: "green" },
			{ label: "Contextual Vocabulary", variant: "blue" },
			{ label: "Playfulness & Humor", variant: "yellow" },
		],
	},
	{
		title: "Grade 6 (50 -70%)",
		data: [
			{ label: "Combinatorics", variant: "blue" },
			{ label: "Artistic Expression", variant: "red" },
			{ label: "Antonyms & Synonyms", variant: "green" },
			{ label: "Contextual Vocabulary", variant: "blue" },
			{ label: "Playfulness & Humor", variant: "yellow" },
		],
	},
	{
		title: "Grade 5 (50 -70%)",
		data: [
			{ label: "Combinatorics", variant: "blue" },
			{ label: "Artistic Expression", variant: "red" },
			{ label: "Antonyms & Synonyms", variant: "green" },
			{ label: "Contextual Vocabulary", variant: "blue" },
			{ label: "Playfulness & Humor", variant: "yellow" },
		],
	},
	{
		title: "Grade 4 (50 -70%)",
		data: [
			{ label: "Combinatorics", variant: "blue" },
			{ label: "Artistic Expression", variant: "red" },
			{ label: "Antonyms & Synonyms", variant: "green" },
			{ label: "Contextual Vocabulary", variant: "blue" },
			{ label: "Playfulness & Humor", variant: "yellow" },
		],
	},
]

type CompetenceChipProps = {
	variant: string
	label: string
}

type CompetenceProps = {
	title: string
	data: CompetenceChipProps[]
	className?: string
}

type CompetenciesGradesCardProps = {
	heading: string
	subHeading: string
	info?: string
	competenceInfo: CompetenceProps[]
}

const CompetenceChip = ({ variant, label }: CompetenceChipProps) => {
	const variantMap = {
		green: "bg-magic-mint text-eagle-green",
		blue: "bg-diamond text-eagle-green",
		red: "bg-light-red text-dark-bronze",
		yellow: "bg-crayola text-dark-bronze",
		purple: "bg-pale-lavender text-indigo",
	}

	return (
		<div
			className={cn(
				"h-[22px] text-sm rounded-sm px-[6px] py-[2px] flex items-center justify-center font-normal",
				variantMap[variant as keyof typeof variantMap]
			)}
		>
			{label}
		</div>
	)
}

const Competence = ({ title, data, className }: CompetenceProps) => {
	return (
		<div className="mt-[-4px]">
			<p className="mb-3 text-granite-gray font-medium"> {title}</p>
			<div className={cn("flex flex-wrap gap-2", className)}>
				{data.map(({ ...rest }, idx) => (
					<CompetenceChip key={idx} {...rest} />
				))}
			</div>
		</div>
	)
}

const CompetenciesGradesCard = ({
	heading,
	subHeading,
	info,
	competenceInfo,
}: CompetenciesGradesCardProps) => {
	return (
		<Card heading={heading} subHeading={subHeading} info={info}>
			{competenceInfo.map(({ ...rest }, idx) => (
				<Competence
					key={`card-${idx}`}
					className={
						idx !== competenceConfig.length - 1 ? "mb-8" : ""
					}
					{...rest}
				/>
			))}
		</Card>
	)
}

export default CompetenciesGradesCard
