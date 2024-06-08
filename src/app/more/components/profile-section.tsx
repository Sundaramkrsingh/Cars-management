import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { profileSectionConfig } from "./constants"
import { Progress } from "@/components/ui/progress"
import Button from "@/components/ui/button"

type AvatarProps = {
  avatar: {
    src?: string
    initials?: string
  }
}

export const Avatar = ({ avatar }: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative h-12 w-12 flex items-center rounded-full justify-center overflow-hidden mt-1",
        avatar?.initials && `bg-pastel-yellow`
      )}
    >
      {avatar?.src ? (
        <Image src={avatar.src} alt="profile-img" layout="fill" />
      ) : (
        <p className="text-[20px] font-semibold text-skobeloff">
          {avatar.initials}
        </p>
      )}
    </div>
  )
}

const ProfileSection = () => {
  const { name, progress, ...rest } = profileSectionConfig

  return (
    <div className="flex flex-col bg-more p-5 text-white">
      <Icons.moreStar className="absolute top-[280px] right-1" />
      <div className="flex gap-4 mb-5">
        <Avatar {...rest} />
        <div>
          <p className="font-semibold text-[22px]">{name}</p>
          <Link href="/more/profile" className="flex items-center">
            <p className="font-medium gap-2">View profile</p>
            <Icons.rightArrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-between items-center  mb-5">
        <Progress
          indicatorClass="bg-magic-mint rounded-[11px]"
          className="bg-skobeloff rounded-[11px] h-[11px] w-[70%]"
          value={progress}
        />
        <p className="w-[30%] text-sm font-semibold text-right">
          {progress}% completed
        </p>
      </div>
      <div className="bg-eagle-green h-[111px] rounded-[10px] p-4 flex flex-col justify-between">
        <p>Have any work experience to add ?</p>
        <div className="flex gap-4">
          <Button
            className="text-sm font-medium bg-white text-black h-9 px-5 w-20 input-shadow "
            label="+ Add"
          />
          <Button
            className="text-sm font-medium bg-blue-sapphire text-white h-9 px-5 w-20 input-shadow "
            label="Skip"
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileSection
