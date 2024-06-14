"use client"

import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Splash = () => {
  const router = useRouter()

  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="bg-splash h-screen w-full p-5 flex flex-col justify-between items-center">
      <div className="mt-[40vh]">
        <div
          className={cn(
            "relative h-[64px] w-[200px] flex items-center justify-center overflow-hidden",
            !show && "animate-pulse "
          )}
        >
          <Image src="/abouv-logo.png" alt="splash" layout="fill" />
        </div>
        <p className="text-lg text-white font-medium mt-4 flex justify-center">
          {"assess > align > ahieve"}
        </p>
      </div>
      <div
        className={cn(
          "w-full transition-all duration-500",
          show ? "opacity-100 visible" : "opacity-0 invisible absolute top-0"
        )}
      >
        <Button
          className="w-full "
          onClick={() => router.push("welcome/intro")}
          label="Sign in"
        />
        {/* <Button
          className="bg-transparent w-full mt-4"
          label="Existing user? Login"
        /> */}
      </div>
    </div>
  )
}

export default Splash
