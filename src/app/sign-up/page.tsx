"use client"

import { Icons } from "@/components/icons"
import { useState } from "react"
import Otp from "./components/otp"
import PhoneNumber from "./components/phone-number"
import { useRouter } from "next/navigation"

const SignUp = () => {
  const router = useRouter()

  const [activeScreen, setActiveScreen] = useState<"opt" | "phone-number">(
    "phone-number"
  )
  const [phone, setPhone] = useState<number>()

  const screenMap = {
    opt: Otp,
    "phone-number": PhoneNumber,
  }

  const CurrentScreen = screenMap[activeScreen]

  const commonProps = {
    setActiveScreen,
    setPhone,
    phone,
  }

  const backClickManager = {
    opt: () => setActiveScreen("phone-number"),
    "phone-number": () => router.push("welcome/intro"),
  }

  return (
    <div>
      <div className="h-[65px] flex items-center gap-2 text-black">
        <Icons.leftArrow
          onClick={backClickManager[activeScreen]}
          className="w-7 h-7 cursor-pointer"
        />
      </div>
      <Icons.beztLogo className="mt-16" />
      <CurrentScreen {...commonProps} />
    </div>
  )
}

export default SignUp
