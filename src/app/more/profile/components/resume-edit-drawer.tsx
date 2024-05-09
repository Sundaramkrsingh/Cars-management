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
import { useResume } from "@/query/profile"
import { ResumeInformation } from "@/store/profile-form-provider"
import { ChangeEvent } from "react"

interface ChildProps {
  fileInputRef: React.MutableRefObject<null>
  resume: ResumeInformation
  handleFileChange: (data: ChangeEvent<HTMLInputElement>) => void
  handleButtonClick: () => void
  handleDeleteButton: () => void
}

const EditResumeDrawer: React.FC<ChildProps> = ({
  fileInputRef,
  resume,
  handleFileChange,
  handleButtonClick,
  handleDeleteButton,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="absolute right-5 top-5 cursor-pointer">
        <Icons.edit />
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
          {resume.resumeDownloadUrl && resume.resumeName && (
            <button
              onClick={handleDeleteButton}
              className="w-full border-[#B3B3B3]  border-2 h-12 rounded-lg flex items-center justify-center text-base font-medium text-red-600"
            >
              Remove
            </button>
          )}

          {/*  </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EditResumeDrawer
