import { Icons } from "@/components/icons"
import Button from "@/components/ui/button"

const Footer = () => {
  return (
    <>
      <div className="h-[230px] bg-help-footer text-left text-white absolute bottom-0 w-full">
        <div className="w-[320px] h-[76px]  mx-[20px] text-left mt-[34px]">
          <p className="text-[26px] text-white font-semibold">
            Can’t find what you’re looking for?
          </p>
        </div>
        <div className="w-[156px] h-[32px] mt-[12px] flex items-center justify-center mx-[20px]">
          <p className="text-center text-[20px] text-white font-normal">
            We’re here to help.
          </p>
        </div>
        <div className="mx-[20px] mt-[8px]">
          <Button
            label="Contact us"
            className="bg-black text-white w-[124px] h-[48px]"
          />
        </div>
        <Icons.helpAba className="absolute bottom-0 right-0" />
      </div>
    </>
  )
}

export default Footer
