import type { ScreenProps } from "../type"
import OTPInput from "react-otp-input"
import Button from "@/components/ui/button"
import { useState } from "react"
import useTimer from "@/hooks/useTimer"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const Otp = ({ setActiveScreen, phone }: ScreenProps) => {
  const router = useRouter()
  const [{ min, sec }, reset, isTimedOut] = useTimer(30)

  const [otp, setOtp] = useState<string | undefined>()

  return (
    <div
      style={{ height: "calc(100vh - 215px)" }}
      className="mt-5 text-black flex flex-col justify-between"
    >
      <div>
        <p className="max-w-56 font-semibold text-2xl">
          {`Verify OTP send to ${phone}`}{" "}
          <span
            onClick={() => setActiveScreen("phone-number")}
            className="cursor-pointer text-celadon-green text-base font-medium ml-1"
          >
            Change
          </span>
        </p>

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          shouldAutoFocus={true}
          renderInput={(props) => (
            <input
              {...props}
              className="mt-10 !w-[50px] h-12 mr-5 text-2xl font-medium rounded-[8px] border-philippine-silver border focus-visible:outline-skobeloff"
              onKeyUp={(e) => {}}
            />
          )}
        />
        <div className="flex justify-between font-medium max-w-[280px] mt-5">
          <p className="text-granite-gray">Didn’t get the code?</p>
          <div
            onClick={() => {
              if (isTimedOut) {
                //api call
                reset()
              }
            }}
            className={cn(
              "text-base",
              isTimedOut ? " cursor-pointer" : "cursor-not-allowed",
              isTimedOut ? "text-dark-charcoal" : "text-granite-gray"
            )}
          >
            {isTimedOut ? (
              "Resend OTP"
            ) : (
              <>
                Resend in: {min < 10 ? `0${min}` : min}:
                {sec < 10 ? `0${sec}` : sec}
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          router.push("/onboarding")
        }}
        disabled={otp?.length !== 4}
        className="w-full disabled:opacity-70"
        label="Continue"
      />
    </div>
  )
}

export default Otp
