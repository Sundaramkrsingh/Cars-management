"use client"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userProfileSchema } from "@/lib/validations/basic-profile"
import { useBasicInfo, useProfile, useProfileAvatar } from "@/query/profile"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Icons } from "@/components/icons"
import { ChangeEvent, useRef, useState } from "react"
import EditAvatarDrawer from "./profile-avatar-edit-drawer"

const ProfileEdit = ({ setEdit, getImage }: PageProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    profileFormData: { profileEdit },
    setProfileEdit,
    setProfileImageData,
  } = useProfileFromData()((state) => state)
  const { editBasicInfo } = useBasicInfo()
  const { avatar } = profileEdit

  const form = useForm<z.infer<typeof userProfileSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userProfileSchema),
    defaultValues: profileEdit,
  })

  const { deleteProfileImgReq } = useProfile()
  const handelSubmit = (data: any) => {
    const { avatar, username, email, ...rest } = form.getValues() as any
    editBasicInfo.mutateAsync({ ...rest } as any).then((res) => {
      const resp = res.data.data
      setProfileEdit({ ...resp, ...data, avatar })
    })
    setEdit(null)
  }

  const { uploadProfileImg } = useProfileAvatar()
  const supportedImageTypes = ["image/jpeg", "image/png", "image/gif"]
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileInputRef = useRef(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
      const selectedImg = e.target.files?.[0]
      if (!selectedImg) {
        return
      }
      if (!supportedImageTypes.includes(selectedImg?.type)) {
        setErrorMessage("Please image as Png, jpg or jpeg")
        setSelectedFile(null)
        return
      } else {
        setErrorMessage(null)
        setSelectedFile(e.target.files?.[0] || null)
        const formData = new FormData()
        formData.append("file", selectedImg)
        await uploadProfileImg.mutateAsync(formData as any)
        const res = await getImage?.refetch()
      }
    }
  }

  const handleButtonClick = () => {
    ;(fileInputRef?.current as HTMLInputElement | null)?.click()
  }

  const handleDeleteButton = async () => {
    deleteProfileImgReq.mutateAsync()
    setProfileImageData("")
  }

  return (
    <>
      <div
        className={cn(
          "relative h-[60px] w-[60px] flex items-center justify-center overflow-hidden mb-4 z-10",
          avatar?.initials
        )}
      >
        {avatar?.src ? (
          <Image
            src={avatar?.src}
            alt="profile-img"
            layout="fill"
            className="rounded-full fill-primary-DEFAULT"
          />
        ) : (
          <div className="rounded-full bg-pastel-yellow h-full w-full flex justify-center items-center">
            <p className="text-[23px] font-semibold text-skobeloff l">
              {avatar?.initials}
            </p>
          </div>
        )}
        <EditAvatarDrawer
          avatar={avatar}
          fileInputRef={fileInputRef}
          handleButtonClick={handleButtonClick}
          handleFileChange={handleFileChange}
          handleDeleteButton={handleDeleteButton}
        />
      </div>

      <form
        onSubmit={form.handleSubmit(handelSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-[18px]">
          <Input
            label="First Name"
            name="firstName"
            form={form}
            placeholder="Enter your first name"
          />
          <Input
            label="Last Name"
            name="lastName"
            form={form}
            placeholder="Enter your last name"
          />
          <Input
            label="Username"
            name="username"
            form={form}
            disabled
            description="Username can only be changed in 272 days"
          />
          <TextArea
            label="Short Bio"
            name="bio"
            form={form}
            placeholder="Add a short bio about yourself"
            textArea
          />
        </div>
        {errorMessage && (
          <div className="flex justify-center">
            <p className="w-[85%] py-1 px-4 bg-[#FECACA] rounded-full text-[#800000] flex justify-between">
              <Icons.info />
              {errorMessage}
            </p>
          </div>
        )}
        <Button type="submit" label="Continue" />
      </form>
    </>
  )
}

export default ProfileEdit
