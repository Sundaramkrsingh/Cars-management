import type { ScreenProps } from "../type"
import OTPInput from "react-otp-input"
import Button from "@/components/ui/button"
import { useEffect, useState } from "react"
import useTimer from "@/hooks/useTimer"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useUserDetails } from "@/store/sing-up-provider"
import { useSignUp } from "@/query/onboarding"
import { useUser } from "@/store/user-provider"
import { setAccessToken, setRefreshToken } from "@/dataProvider/auth-setter"

const Otp = ({ setActiveScreen, phone }: ScreenProps) => {
  const router = useRouter()
  const [{ min, sec }, reset, isTimedOut] = useTimer(60)

  const [otp, setOtp] = useState<string | undefined>()
  const [hasShownAlert, setHasShownAlert] = useState(false)
  const [error, setError] = useState("")

  const useDetails = () => {
    const {
      userDetails: { mobile, smsOtp },
      setUserOtp,
    } = useUserDetails()((data) => data)
    return { mobile, smsOtp, setUserOtp }
  }
  const { mobile, smsOtp, setUserOtp } = useDetails()
  const { signInUserDtls, sendOptDetails } = useSignUp()
  const { setUser } = useUser()((data) => data)
  //should be removed once Otp functionality is implemented on backend
  useEffect(() => {
    setTimeout(() => {
      if (!hasShownAlert && smsOtp) {
        alert(`Verify OTP sent to ${phone}. The OTP is ${smsOtp}`)
        setHasShownAlert(true)
      }
    }, 1000)
  }, [hasShownAlert, smsOtp])

  async function handelSubmit(otp: number) {
    if (otp !== smsOtp) {
      setError("Incorrect OTP")
      return
    }
    const singInDtl = {
      phoneNumber: mobile,
      smsOtp: otp,
    }
    const SignInUserRes = await signInUserDtls.mutateAsync(singInDtl)
    const userInfo = SignInUserRes?.data?.data?.userInfo
    setUser({ id: userInfo?.id })
    setAccessToken(SignInUserRes?.data?.data?.token)
    setRefreshToken(SignInUserRes?.data?.data?.refreshToken)
    router.push("/onboarding")
  }

  async function reSendOpt(data: { phoneNumber: string }) {
    setError("")
    sendOptDetails.mutateAsync(data).then((res) => {
      if (res.data.statusCode === 200) {
        const otp = res?.data?.data?.otp
        setUserOtp(otp)
      }
    })
  }

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
                reSendOpt({
                  phoneNumber: mobile,
                })
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
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <Button
        onClick={() => {
          handelSubmit(Number(otp))
        }}
        disabled={otp?.length !== 4}
        className="w-full disabled:opacity-70"
        label="Continue"
      />
    </div>
  )
}

export default Otp
