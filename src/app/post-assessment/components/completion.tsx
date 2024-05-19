import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import React from "react"
import type { PostAssessmentProps } from "../type"

const Completion = ({ setStage }: PostAssessmentProps) => {
  return (
    <>
      <Icons.postAssessmentPattern className="absolute top-[-60px] left-[-30px] rotate-180" />
      <Icons.postAssessmentPattern className="absolute bottom-0 right-0" />
      <div className="fixed w-[380px] overflow-hidden overflow-y-scroll no-scrollbar text-primary px-5 pb-[10px] bg-no-repeat">
        <div className="w-full h-screen flex flex-col items-center mt-28">
          <Icons.postAssessmentAba />
          <div className="w-[250px] flex items-center justify-center flex-col mb-3">
            <p className="text-center text-[26px] text-black font-bold">
              Today’s assessment complete !
            </p>
          </div>
          <div className="flex gap-11">
            <div className="flex flex-col">
              <div className="text-dark-liver text-sm">Points achieved</div>
              <div className="flex items-center gap-1">
                <Icons.star />
                <div className="text-black text-2xl font-medium">300.65</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-dark-liver text-sm">Session accuracy</div>
              <div className="flex items-center gap-1">
                <Icons.aim />
                <div className="text-black text-2xl font-medium">300.65</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        label="Continue"
        style={{
          width: "calc(100% - 40px)",
        }}
        onClick={() => setStage("punctuality")}
        className="absolute bottom-5 z-10 left-5"
      />
    </>
  )
}

export default Completion
