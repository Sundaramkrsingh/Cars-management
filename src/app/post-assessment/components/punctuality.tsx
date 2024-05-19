import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import type { PostAssessmentProps } from "../type"

const Punctuality = ({ setStage }: PostAssessmentProps) => {
  const [showTotalPoints, setShowTotalPoints] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTotalPoints(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed w-[380px] overflow-hidden overflow-y-scroll no-scrollbar text-primary px-5 pb-[10px] bg-eagle-green bg-no-repeat">
      <div className="h-[65px] flex items-center gap-2 text-white">
        <Icons.leftArrow
          onClick={() => setStage("complete")}
          className="w-7 h-7 cursor-pointer"
        />
      </div>
      <div
        style={{
          height: "calc(100vh - 65px)",
        }}
        className="w-full flex flex-col items-center mt-5 relative"
      >
        {showTotalPoints ? (
          <>
            <Icons.postAssessmentAba />
            <div className="flex items-center justify-center flex-col mb-3">
              <p className="text-center text-[28px] text-white font-medium">
                Total points
              </p>
              <div className="bg-rich-black h-[84px] rounded-[8px] px-5 flex items-center justify-center gap-3 text-white text-4xl font-semibold mt-4">
                <p>5,67,34,576</p>
                <Icons.abouv />
              </div>
              <p className="mt-5 text-sm">
                You received <span className="font-semibold">+ 70</span> as
                punctuality points
              </p>
            </div>
          </>
        ) : (
          <>
            <Icons.searchAba />
            <div className="flex items-center justify-center flex-col mb-3">
              <p className="text-center text-[22px] text-white font-medium">
                Punctuality points received
              </p>

              <div className="bg-rich-black h-[84px] rounded-[8px] px-5 flex items-center justify-center gap-3 text-white text-4xl font-semibold mt-4">
                <p>+ 70</p>
                <Icons.points />
              </div>
            </div>
          </>
        )}
        <Button
          label="Continue"
          style={{
            width: "calc(100% - 40px)",
          }}
          className="absolute bg-medium-aquamarine bottom-10 text-black z-10 left-5"
        />
      </div>
    </div>
  )
}

export default Punctuality
