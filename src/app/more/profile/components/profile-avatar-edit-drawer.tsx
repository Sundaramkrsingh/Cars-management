"use client"
import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useProfileAvatar } from "@/query/profile"
import { ChangeEvent, MutableRefObject, useRef, useState } from "react"

interface ChildProps {
  fileInputRef: MutableRefObject<null>
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  handleButtonClick: () => void
  handleDeleteButton: () => void
  avatar: any
}

const EditAvatarDrawer: React.FC<ChildProps> = ({
  avatar,
  fileInputRef,
  handleButtonClick,
  handleFileChange,
  handleDeleteButton,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="z-10 absolute bottom-0 right-0 cursor-pointer">
        <Icons.addItem />
      </DrawerTrigger>
      <DrawerContent className="border-none bg-white flex flex-col items-center">
        <DrawerHeader className="w-full">
          <DrawerTitle className="w-full text-2xl font-semibold text-black text-left">
            Profile Picture
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="w-full gap-4 flex-row">
          {/* <DrawerClose className="w-full flex flex-row gap-4"> */}
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            onClick={handleButtonClick}
            className="w-full border-[#B3B3B3] border-2  h-12 rounded-lg flex items-center justify-center text-base font-medium text-primary-DEFAULT"
          >
            Edit
          </button>
          {avatar?.src && (
            <button
              onClick={handleDeleteButton}
              className="w-full border-[#B3B3B3]  border-2 h-12 rounded-lg flex items-center justify-center text-base font-medium text-red-600"
            >
              Remove
            </button>
          )}

          {/* </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EditAvatarDrawer
