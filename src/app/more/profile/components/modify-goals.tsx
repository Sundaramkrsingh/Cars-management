import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useState } from "react"
import { PageProps } from "../../type"

const radioOptions = [
  {
    label: "Job Opportunities",
    value: "Job Opportunities",
  },
  {
    label: "Paid Interships",
    value: "Paid Interships",
  },
  {
    label: "Freelancing Gigs",
    value: "Freelancing Gigs",
  },
  {
    label: "Expternship Gigs",
    value: "Expternship Gigs",
  },
  {
    label: "Self Assessment",
    value: "Self Assessment",
  },
  {
    label: "Competitive Exams",
    value: "Competitive Exams",
  },
  {
    label: "Volunteer Work",
    value: "Volunteer Work",
  },
  {
    label: "Higher-Ed Abroad",
    value: "Higher-Ed Abroad",
  },
  {
    label: "Networking Events",
    value: "Networking Events",
  },
  {
    label: "Peer Benchmark",
    value: "Peer Benchmark",
  },
]

const ModifyGoals = ({ setEdit }: PageProps) => {
  const {
    profileFormData: { workGoals },
    setWorkGoal,
  } = useProfileFromData()((state) => state)

  const [selections, setSelections] = useState<string[]>(workGoals)

  return (
    <div className="flex flex-col min-h-full justify-between">
      <div className="flex flex-col gap-2">
        {radioOptions.map(({ label, value }, index) => (
          <div
            onClick={() =>
              selections.includes(value)
                ? setSelections((prev) => prev.filter((itm) => itm !== value))
                : setSelections((prev) => [...prev, value])
            }
            key={index}
            className={cn(
              "transition-all duration-200 card-shadow cursor-pointer flex px-4 h-12 rounded-[10px] items-center justify-between text-lg font-semibold",
              selections.includes(value)
                ? "bg-celadon-green text-white"
                : "bg-white text-eagle-green"
            )}
          >
            <p>{label}</p>

            <div className="w-5 h-5">
              {selections.includes(value) ? (
                <Icons.selected className="cursor-pointer" />
              ) : (
                <Icons.addItem className="cursor-pointer" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        label="Save"
        onClick={() => {
          setWorkGoal(selections)
          setEdit(null)
        }}
        className="w-full"
      />
    </div>
  )
}

export default ModifyGoals
