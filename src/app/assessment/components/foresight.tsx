import { Icons } from "@/components/icons"
import ForSight from "./foresight-card"
import PreQHeading from "./pre-q-heading"
import { QuestionProps } from "./questions-series/series-type"

const Foresight = ({ avgTime, accuracy, timeLimit }: QuestionProps) => {
  return (
    <div>
      <PreQHeading heading="FORESIGHTS" />
      <div className="flex gap-2 mb-3">
        <div className="rounded-full bg-crayola h-6 w-6 flex justify-center items-center">
          <span className="font-semibold text-black text-[10px]">FS</span>
        </div>
        <div className="flex flex-col gap-2 text-sm font-medium">
          <div className="flex gap-2 items-center">
            <Icons.rightArrow className="w-3 h-3" />
            <p>Attitude Essentials</p>
          </div>
          <div className="flex gap-2 items-center">
            <Icons.rightArrow className="w-3 h-3" />
            <p>Integrity & Ethics</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center h-8">
        <ForSight description="Avg. time" stats={avgTime}>
          <Icons.clock className="text-rackley w-6 h-6" />
        </ForSight>
        <ForSight description="Accuracy" stats={accuracy}>
          <Icons.target className="text-rackley w-6 h-6 stroke-rackley" />
        </ForSight>
        <ForSight description="Time limit" stats={timeLimit}>
          <Icons.timeLimit className="w-6 h-6 fill-rackley stroke-rackley" />
        </ForSight>
      </div>
    </div>
  )
}

export default Foresight
