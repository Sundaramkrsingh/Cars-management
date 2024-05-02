"use client"

import {
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js"
import { Radar } from "react-chartjs-2"
import Card from "./card"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

type FacetsScoreCardProps = {
  heading: string
  subHeading: string
  info?: string
  facetsScoreGraphConfig: ChartData<"radar", (number | null)[], unknown>
  variant: "tier1" | "tier2" | "tier3"
}

const FacetsScoreCard = ({
  heading,
  subHeading,
  info,
  facetsScoreGraphConfig,
  variant,
}: FacetsScoreCardProps) => {
  return (
    <Card
      heading={heading}
      subHeading={subHeading}
      info={info}
      variant={variant}
    >
      <Radar data={facetsScoreGraphConfig} />
    </Card>
  )
}

export default FacetsScoreCard
