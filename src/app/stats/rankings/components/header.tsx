import { Icons } from "@/components/icons"
import Link from "next/link"
import { Suspense } from "react"
import TopRankers from "./top-rankers"

const Header = ({
  type,
  setType,
  isSuccess,
}: {
  type: string
  setType: any
  isSuccess: boolean
}) => {
  return (
    <div className="fixed bg-stats w-inherit overflow-hidden bg-fixed bg-[center_top_60px] overflow-y-scroll no-scrollbar bg-red-50 text-primary px-5 py-10 w-full rounded-b-[32px] pb-[18px] bg-no-repeat">
      <div className="h-[66px] flex items-center gap-2 ">
        <Link href="/stats">
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">Rankings</h1>
      </div>
      <div>
        <Suspense>
          <TopRankers type={type} setType={setType} isSuccess={isSuccess} />
        </Suspense>
      </div>
    </div>
  )
}

export default Header
