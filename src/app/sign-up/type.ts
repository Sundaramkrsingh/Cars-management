import { Dispatch, SetStateAction } from "react"

export type ScreenProps = {
  setActiveScreen: Dispatch<SetStateAction<"opt" | "phone-number">>
  setPhone: Dispatch<SetStateAction<any>>
  phone: any
}
