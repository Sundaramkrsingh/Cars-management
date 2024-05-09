"use client"
import { createContext, useContext, useState } from "react"
import { create } from "zustand"

export type UserSignInInfo = {
  mobile: string
  smsOtp: number
}

const initialState: UserSignInInfo = {
  mobile: "",
  smsOtp: 0,
}

const createStore = (userDetails: UserSignInInfo) =>
  create<{
    userDetails: UserSignInInfo
    setUserMobileNo: (data: UserSignInInfo["mobile"]) => void
    setUserOtp: (data: UserSignInInfo["smsOtp"]) => void
  }>((set) => ({
    userDetails,
    setUserMobileNo(data: UserSignInInfo["mobile"]) {
      set((prev) => ({
        ...prev,
        userDetails: { ...prev.userDetails, mobile: data },
      }))
    },
    setUserOtp(data: UserSignInInfo["smsOtp"]) {
      set((prev) => ({
        ...prev,
        userDetails: { ...prev.userDetails, smsOtp: data },
      }))
    },
  }))

const UserInfoContext = createContext<ReturnType<typeof createStore> | null>(
  null
)

export const useUserDetails = () => {
  if (!UserInfoContext)
    throw new Error("useCounter must be used within a ChatProvider")
  return useContext(UserInfoContext)!
}

const UserInfoProvider = ({
  userInfo = initialState,
  children,
}: {
  userInfo?: UserSignInInfo
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(userInfo))
  return (
    <UserInfoContext.Provider value={store}>
      {children}
    </UserInfoContext.Provider>
  )
}

export default UserInfoProvider
