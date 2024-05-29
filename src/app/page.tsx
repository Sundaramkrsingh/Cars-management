"use client"

import { Icons } from "@/components/icons"
import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import Button from "@/components/ui/button"
import { useHome } from "@/query/in-q"
import { useChat } from "@/store/chat-provider"
import Link from "next/link"
import { Avatar } from "./more/components/profile-section"

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
                  {`${assessmentMetaData?.stage || ""} ${assessmentMetaData?.grade || ""}`}
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
  const {
    chat: { assessmentMetaData },
  } = useChat()((state) => state)

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")

  useHome()

  return (
    <div className="bg-home w-[380px] no-scrollbar h-screen mx-auto relative z-1 overflow-y-scroll">
      <div className=" px-5 pt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Avatar
              avatar={{
                initials: getInitials(
                  assessmentMetaData?.name || "Christopher Alice"
                ),
              }}
            />
            <div>
              <p className="font-semibold text-[22px] text-white">
                Hey{" "}
                {assessmentMetaData?.userInfo?.name?.split(" ")?.[0] ||
                  "Christopher"}
              </p>
              <p className="gap-2 text-[#F2F2F2]">Welcome to abouv !</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Icons.info className="stroke-white cursor-pointer" />
            <Icons.bell className="stroke-white cursor-pointer" />
          </div>
        </div>
        <InfoCard />
        <div className="flex gap-3 justify-center items-center my-5">
          <Icons.quoteRight className="rotate-180" />
          <p className="text-sm text-white">
            Small steps in the right direction can turn out to be the biggest
            step in your life
          </p>
          <Icons.quoteRight />
        </div>
      </div>
      <MobileNavigationBar />
    </div>
  )
}
