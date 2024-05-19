import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUserDetails } from "@/store/sing-up-provider"
import { Dispatch, SetStateAction } from "react"

type UserInfoProps = {
  title: string
  selections: { [key: string]: string | string[] | null }
  category: string
  setSelections: Dispatch<
    SetStateAction<{
      [key: string]: string[] | string | null
    }>
  >
  options:
    | {
        name: string
        id: string
      }[]
    | undefined
  onClick: () => void
  selectOne?: boolean
}

const UserInfo = ({
  title,
  selections,
  setSelections,
  onClick,
  category,
  selectOne = true,
}: UserInfoProps) => {
  const {
    userDetails: { options },
  } = useUserDetails()((state) => state)

  console.log(typeof selections[category])

  return (
    <div className="flex flex-col h-user-info justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold text-dark-charcoal mb-5 mt-3">
          {title}
        </p>
        {options[category]?.map(({ name, id }, index) => (
          <div
            onClick={() => {
              let categorySelections = selections[category] || []

              if (selectOne) {
                categorySelections = selections[category] || ""

                categorySelections === id
                  ? setSelections((prev) => ({
                      ...prev,
                      [category]: null,
                    }))
                  : setSelections((prev) => ({
                      ...prev,
                      [category]: name,
                    }))
              } else {
                categorySelections?.includes(id)
                  ? setSelections((prev) => ({
                      ...prev,
                      [category]: ((prev[category] as []) || []).filter(
                        (itm) => itm !== id
                      ),
                    }))
                  : setSelections((prev) => ({
                      ...prev,
                      [category]: [...((prev[category] as []) || []), id],
                    }))
              }
            }}
            key={index}
            className={cn(
              "transition-all duration-200 card-shadow cursor-pointer flex px-4 h-12 rounded-[10px] items-center justify-between text-lg font-semibold",
              (
                typeof selections[category] === "string"
                  ? selections[category] === name
                  : selections[category]?.includes(id)
              )
                ? "bg-celadon-green text-white"
                : "bg-white text-eagle-green"
            )}
          >
            <p>{name}</p>

            <div className="w-5 h-5">
              {(
                typeof selections[category] === "string"
                  ? selections[category] === name
                  : selections[category]?.includes(id)
              ) ? (
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
        disabled={!selections[category]}
        className="w-full"
      />
    </div>
  )
}

export default UserInfo
