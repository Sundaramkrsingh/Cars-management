import Button from "@/components/ui/button"
import type { ScreenProps } from "../type"
import { PhoneInput } from "./phone-input"
import { useSignUp } from "@/query/onboarding"
import { useUserDetails } from "@store/sing-up-provider"

const PhoneNumber = ({ setActiveScreen, setPhone, phone }: ScreenProps) => {
  const useDetails = () => {
    const { setUserMobileNo, setUserOtp } = useUserDetails()((data) => data)
    return { setUserMobileNo, setUserOtp }
  }
  const { setUserMobileNo, setUserOtp } = useDetails()
  const { signUpUserDts, sendOptDetails } = useSignUp()
  async function handelSubmit(data: any) {
    const createUserRes = await signUpUserDts.mutateAsync(data)

    if (createUserRes.data.statusCode === 200) {
      const { phoneNumber: mobileNumber } = createUserRes?.data?.data?.userInfo
      setUserMobileNo(mobileNumber)
      sendOptDetails.mutateAsync(data).then((res) => {
        if (res.data.statusCode === 200) {
          const otp = res?.data?.data?.otp
          setUserOtp(otp)
        }
      })
      setActiveScreen("opt")
    }
  }

  return (
    <div
      style={{ height: "calc(100vh - 215px)" }}
      className="mt-5 text-black flex flex-col justify-between"
    >
      <div>
        <p className="max-w-56 font-semibold text-2xl">
          Enter you mobile number to get OTP
        </p>
        <div className="mt-10">
          <PhoneInput value={phone} onChange={setPhone} />
        </div>
      </div>
      <Button
        onClick={() => handelSubmit({ phoneNumber: phone })}
        disabled={!phone}
        className="w-full disabled:opacity-70"
        label="Continue"
      />
    </div>
  )
}

export default PhoneNumber
