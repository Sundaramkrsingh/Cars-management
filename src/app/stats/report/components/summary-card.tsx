import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import React from "react"
import ReportDrawer from "./report-drawer"
import { useFacetsReports } from "@/query/facets-reports"

type Stat = {
  value: string
  title: string
}

type ProgressBarProps = {
  progress: number
  description?: string
}

type SummaryCardProps = {
  heading: string
  subHeading: string
  progress: number
  description: string
  stats: Stat[]
  variant: "progression" | "performance"
}

const ProgressBar = ({ description, progress }: ProgressBarProps) => {
  return (
    <div className="mb-6 relative mt-5">
      {description && (
        <div
          style={{
            left: `${progress - 2}%`,
          }}
          className={cn("absolute z-10 top-[-15px] flex justify-center")}
        >
          <Icons.triangle />
          <p className="absolute top-[-15px] text-nowrap text-xs text-dark-charcoal">
            {description}{" "}
            <span className="text-smoky-black font-semibold text-xs">
              {progress}%
            </span>
          </p>
        </div>
      )}
      <Progress
        indicatorClass="bg-celadon-green rounded-sm"
        className="bg-aero-blue rounded-sm"
        value={progress}
      />
    </div>
  )
}

const StatsRenderer = ({ value, title }: Stat) => {
  return (
    <div className="flex flex-col">
      <p className="text-dark-charcoal text-xs">{title}</p>
      <p className="text-smoky-black font-medium">{value}</p>
    </div>
  )
}

const SummaryCard = ({
  heading,
  progress,
  stats,
  subHeading,
  description,
  variant,
}: SummaryCardProps) => {
  return (
    <div className="card-shadow">
      <div className="flex flex-col p-[18px] pb-2 rounded-t-[10px] bg-white border-b-water border-b">
        <div className="flex gap-1 items-center">
          <p className="font-semibold text-lg text-black">{heading}</p>
          <ReportDrawer key={heading} type="summary" variant={variant} />
        </div>
        <p className="text-eagle-green text-xs font-medium">{subHeading}</p>
      </div>

      <div className="p-[18px] rounded-b-[10px] overflow-hidden bg-azure">
        <ProgressBar progress={progress} description={description} />
        <div className="flex gap-8">
          {stats.map(({ ...rest }, idx) => (
            <StatsRenderer key={idx} {...rest} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
