"use client"

import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { useInQuestion } from "@/query/in-q"
import { useChat } from "@/store/chat-provider"
import Link from "next/link"

const InfoCard = () => {
  const {
    chat: { assessmentMetaData },
  } = useChat()((state) => state)

  return (
    <div className="bg-white h-[200px] rounded-[8px] p-4 flex w-full relative">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col text-black">
          <div className="font-bold uppercase text-[28px]">
            {assessmentMetaData.testType ? (
              assessmentMetaData.testType
            ) : (
              <div className="h-[42px] w-[128px] bg-gray-300 rounded-md animate-pulse" />
            )}
          </div>
          <p className="text-eerie-black text-[22px] font-normal uppercase">
            Assessment
          </p>
          <div className="flex gap-2">
            {assessmentMetaData.day ? (
              <>
                <p className="font-">Day {assessmentMetaData.day}</p>
                <div className="bg-aero-blue rounded-sm text-eagle-green px-2 text-sm">
                  S15 G7
                </div>
              </>
            ) : (
              <div className="h-6 w-[128px] bg-gray-300 rounded-md animate-pulse" />
            )}
          </div>
        </div>
        <Link href="/assessment">
          <Button
            className="bg-black h-12 w-[118px] font-medium text-lg"
            label={"Start now"}
          />
        </Link>
      </div>
      <Icons.homeAba className="absolute right-[-10px]" />
    </div>
  )
}

export default function Home() {
  useInQuestion()

  return (
    <div className="bg-home w-[380px] no-scrollbar h-screen mx-auto relative z-1 overflow-y-scroll px-5 pt-8">
      <h1 className="text-white  mb-5 text-3xl">Welcome to abouv !</h1>
      <InfoCard />
      <div className="flex gap-3 justify-center items-center my-5">
        <Icons.quoteRight className="rotate-180" />
        <p className="text-sm text-white">
          Small steps in the right direction can turn out to be the biggest step
          in your life
        </p>
        <Icons.quoteRight />
      </div>
    </div>
  )
}
