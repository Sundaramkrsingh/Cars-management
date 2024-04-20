import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

type UserInfoProps = {
  title: string
  selections: { [key: string]: string[] }
  category: string
  setSelections: Dispatch<
    SetStateAction<{
      [key: string]: string[]
    }>
  >
  options: {
    label: string
    value: string
  }[]
  onClick: () => void
}

const UserInfo = ({
  title,
  options,
  selections,
  setSelections,
  onClick,
  category,
}: UserInfoProps) => {
  return (
    <div className="flex flex-col h-user-info justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold text-dark-charcoal mb-5 mt-3">
          {title}
        </p>
        {options.map(({ label, value }, index) => (
          <div
            onClick={() => {
              const categorySelections = selections[category] || []

              categorySelections?.includes(value)
                ? setSelections((prev) => ({
                    ...prev,
                    [category]: (prev[category] || []).filter(
                      (itm) => itm !== value
                    ),
                  }))
                : setSelections((prev) => ({
                    ...prev,
                    [category]: [...(prev[category] || []), value],
                  }))
            }}
            key={index}
            className={cn(
              "transition-all duration-200 card-shadow cursor-pointer flex px-4 h-12 rounded-[10px] items-center justify-between text-lg font-semibold",
              selections[category]?.includes(value)
                ? "bg-celadon-green text-white"
                : "bg-white text-eagle-green"
            )}
          >
            <p>{label}</p>

            <div className="w-5 h-5">
              {selections[category]?.includes(value) ? (
                <Icons.selected className="cursor-pointer" />
              ) : (
                <Icons.addItem className="cursor-pointer" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        label="Continue"
        onClick={onClick}
        disabled={!selections[category]?.length}
        className="w-full"
      />
    </div>
  )
}

export default UserInfo
