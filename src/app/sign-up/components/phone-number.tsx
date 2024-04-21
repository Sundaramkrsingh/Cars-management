import Button from "@/components/ui/button"
import type { ScreenProps } from "../type"
import { PhoneInput } from "./phone-input"

const PhoneNumber = ({ setActiveScreen, setPhone, phone }: ScreenProps) => {
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
        onClick={() => {
          setActiveScreen("opt")
          console.log(phone)
        }}
        disabled={!phone}
        className="w-full disabled:opacity-70"
        label="Continue"
      />
    </div>
  )
}

export default PhoneNumber
