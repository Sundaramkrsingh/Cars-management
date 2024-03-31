import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  drawerContent as content,
  drawerHeadings as heading,
  drawerSubHeadings as subHeading,
} from "./constants"

type RendererProps = {
  title?: string
  description?: string
  data?: {
    title?: string
    description?: string
    table?: {
      tableData: {
        [key: string]: string
      }[]
      header: string[]
    }
  }[]
}

const TierRenderer = ({ title, description }: RendererProps) => {
  return (
    <div className="flex flex-col p-5 pt-0 w-full">
      <Separator className="my-[10px] bg-chinese-silver mb-7" />
      <p className="font-medium text-xl text-eerie-black">{title}</p>
      <p className="text-dark-charcoal">{description}</p>
    </div>
  )
}

const SummaryRenderer = ({ data }: RendererProps) => {
  return (
    <div className="flex flex-col gap-5 px-[18px] w-full">
      {data?.map(({ title, description, table }, idx) => {
        const w = table && `${(100 / table?.header.length).toFixed(0)}`

        return (
          <div key={`${title}_${idx}`} className="w-full pb-[18px]">
            {table ? (
              <>
                <p className="text-[28px] font-semibold mb-2 text-black text-left">
                  {title}
                </p>
                <div
                  className={cn("flex gap-[2px] mb-[2px] items-center w-full")}
                >
                  {table.header.map((val, idx) => (
                    <div
                      key={`${val}_${idx}`}
                      className={cn(
                        "h-8 text-white font-semibold rounded-[4px] bg-celadon-green flex items-center px-3 text-nowrap",
                        `w-[33%]`
                      )}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full">
                  {table.tableData.map((val, rowIdx) => {
                    return (
                      <div
                        className="flex gap-[2px] w-full mb-[2px] text-sm font-normal text-black"
                        key={`${val}_${rowIdx}`}
                      >
                        {Object.values(val).map((itm, idx) => (
                          <div
                            key={`${itm}_${idx}`}
                            className={cn(
                              "h-8 rounded-[4px] flex items-center px-3 text-nowrap",
                              `w-[33%]`,
                              rowIdx % 2 === 0
                                ? "bg-aero-blue"
                                : "bg-light-cyan"
                            )}
                          >
                            {itm}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div>
                <p className="text-[28px] font-semibold mb-2 text-black text-left">
                  {title}
                </p>
                <p className="text-dark-charcoal text-left">{description}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ReportDrawer = ({
  type,
  variant,
}: {
  type: "tier" | "summary"
  variant: "tier1" | "tier2" | "tier3" | "progression" | "performance"
}) => {
  const rendererMap = {
    tier: TierRenderer,
    summary: SummaryRenderer,
  }

  const Renderer = rendererMap[type]

  return (
    <Drawer>
      <DrawerTrigger className="text-celadon-green font-medium text-lg cursor-pointer right-5 top-[-52px]">
        <Icons.info className="w-[14px] h-[14px] text-granite-gray cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="border-none bg-white flex flex-col items-center w-full">
        <div className="max-h-[90vh] overflow-auto no-scrollbar">
          <DrawerHeader className="text-left w-full">
            <DrawerTitle className="text-[28px] font-semibold mb-2 text-black text-left">
              {heading[variant]}
            </DrawerTitle>
            <DrawerDescription className="text-dark-charcoal text-left">
              {subHeading[variant]}
            </DrawerDescription>
          </DrawerHeader>
          <Renderer {...content[variant]} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default ReportDrawer
