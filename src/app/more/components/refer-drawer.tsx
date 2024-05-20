"use client"

import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

import Link from "next/link"

const ReferDrawer = ({ children }: { children: React.ReactNode }) => {
  const shareIcons = [
    Icons.whatsapp,
    Icons.facebook_secondary,
    Icons.gmail,
    Icons.linkedin_secondary,
    Icons.more_secondary,
  ]
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText("@mariageorgebezt/refercode/0345")
      .then(() => {
        toast({
          title: "Copied to clipboard !",
          className:
            "!bg-celadon-green !text-white w-[200px] h-[10px] !text-[14px] !font-medium",
          duration: 1000,
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }
  return (
    <Drawer>
      <DrawerTrigger className="text-celadon-green font-medium cursor-pointer right-5 top-[-52px]">
        {children}
      </DrawerTrigger>
      <DrawerContent className="border-none bg-white flex flex-col items-center w-full">
        <Icons.referAba className="w-[223px] h-[183px] mt-[16px] mx-[69px] mb-[2px]" />
        <div className="flex flex-col items-center">
          <p className="font-semibold	 text-[28px] text-black mb-[4px] ">
            Loved our product ?
          </p>
          <p className="font-normal text-[14px] text-[#333333] mb-[4px] ">
            You can help us by sharing it with your friends
          </p>
        </div>

        <div className="flex gap-[8px] mt-[75px] mb-[26px]">
          <div className="w-[212px] h-[32px] rounded-[8px] border-[1px] border-[#CCCCCC]">
            <p className="text-[#0D0D0D] font-medium text-[14px] py-[5px] px-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
              @mariageorgebezt/refercode/0345
            </p>
          </div>
          <Button
            label="Copy"
            className="w-[99px] bg-[#57A3A9] h-[32px] rounded-lg flex items-center justify-center text-base font-medium text-white"
            onClick={handleCopyClick}
          />
        </div>
        <Toaster />
        <div className="flex gap-[3px] mb-[22px]">
          <hr className="w-[150px] mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />
          <p className="text-[10px] font-normal text-[#333333] py-[12px]">OR</p>
          <hr className="w-[150px] mt-[20px] mb-[20px] border-[1px solid #E6E6E6]" />
        </div>
        <div className="flex gap-[20px] mx-[20px] mb-[20px]">
          {shareIcons.map((Icon, idx) => (
            <Link
              className="border-[1px] border-[#E6E6E6] rounded-full p-[10px]"
              key={idx}
              href="#"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default ReferDrawer
