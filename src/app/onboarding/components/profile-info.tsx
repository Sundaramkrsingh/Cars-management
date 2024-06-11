/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userProfileInfoSchema } from "@/lib/validations/profile-info"
import { useInitProfile } from "@/query/onboarding"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const FileUpload = ({
  file,
  setFile,
}: {
  file: string
  setFile: React.Dispatch<React.SetStateAction<string>>
}) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileName: string[] = e?.target?.files[0]?.name?.split(".")

      setFile(fileName[0])

      const image: HTMLImageElement | null = document.getElementById(
        "user-profile-img"
      ) as HTMLImageElement | null
      if (image) {
        image.src = window.URL.createObjectURL(e.target.files[0])
      }
    }
  }

  const handleButtonClick = (
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    fileInputRef?.current?.click()
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        className="mt-2 text-sm text-dark-liver"
        onClick={() => handleButtonClick(fileInputRef)}
      >
        {file ? (
          <div className="flex gap-1 items-center justify-center">
            <Icons.pencil />
            <p>Edit photo</p>
          </div>
        ) : (
          "+ Add Photo"
        )}
      </button>
    </>
  )
}

const ProfileInfo = ({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>
}) => {
  const router = useRouter()

  const [userImage, setUserImage] = useState("")
  const { createProfile } = useInitProfile()

  const handleError = () => {
    toast.error("Something went wrong, please try again")
  }

  const form = useForm<z.infer<typeof userProfileInfoSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userProfileInfoSchema),
    defaultValues: {},
  })

  const handelSubmit = (data: any) => {
    setProgress(100)
    console.log(data)
    createProfile.mutateAsync(data, { onError: handleError })
  }

  return (
    <div className="h-user-info text-black flex flex-col justify-between">
      <div className="mt-3">
        <p className="font-semibold text-2xl text-dark-charcoal">
          Tell us about yourself?
        </p>

        <div className="w-full flex justify-center items-center flex-col my-5">
          <div className="overflow-hidden relative rounded-full w-20 h-20 border-spacing-1 border-celadon-green border-2">
            <img
              className="w-full h-full border-2 rounded-full border-white"
              id="user-profile-img"
              src="/profile-placeholder.svg"
              alt="profile"
            />
          </div>
          <FileUpload file={userImage} setFile={setUserImage} />
        </div>

        <form
          onSubmit={form.handleSubmit(handelSubmit)}
          className="flex flex-col justify-between mt-5"
          style={{
            height: "calc(100vh - 258px)",
            paddingBlockEnd: "20px",
          }}
        >
          <div className="flex flex-col gap-[18px]">
            <Input
              label="First Name"
              name="firstName"
              form={form}
              placeholder="Enter First Name"
            />
            <Input
              label="Last Name"
              name="lastName"
              form={form}
              placeholder="Enter Last Name"
            />
            <Input
              label="Pin Code"
              name="pincode"
              form={form}
              type="number"
              placeholder="Enter Pin code"
            />
          </div>
          <Button
            type="submit"
            label="Continue"
            className=""
            disabled={!form.formState.isValid}
            onClick={() => router.push("/")}
          />
        </form>
      </div>
    </div>
  )
}

export default ProfileInfo
