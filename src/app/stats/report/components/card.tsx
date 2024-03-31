import React from "react"
import ReportDrawer from "./report-drawer"

type CardProps = {
  children: React.ReactNode
  heading: string
  subHeading: string
  info?: string
  variant: "tier1" | "tier2" | "tier3"
}

const Card = ({ heading, subHeading, info, children, variant }: CardProps) => {
  return (
    <div className="flex flex-col card-shadow p-[18px] rounded-[10px] bg-white">
      <p className="font-semibold text-sm text-dark-charcoal mb-2 uppercase">
        {heading}
      </p>
      <div className="flex gap-1 items-center mb-4">
        <p className="text-black text-lg font-medium ">{subHeading}</p>
        {info && <ReportDrawer type="tier" variant={variant} />}
      </div>
      {children}
    </div>
  )
}

export default Card
