"use client"

import dataProvider from "@/dataProvider"
import { useMutation } from "@tanstack/react-query"

let fetcher = dataProvider("userInstance")

const postSignUp = ({ data }: { data: { phoneNumber: string } }) => {
  return fetcher.post(`/auth/sign-up`, data)
}

const sendOtp = ({ data }: { data: { phoneNumber: string } }) => {
  return fetcher.post(`/auth/send-otp`, data)
}

const singIn = ({
  data,
}: {
  data: { phoneNumber: string; smsOtp: number }
}) => {
  return fetcher.post(`/auth/sign-in`, data)
}

export const useSignUp = () => {
  const postSingUP = () => ["post-singUp"]
  const sendOtpKey = () => ["send-otp"]
  const singUpKey = () => ["sing-up"]

  const signUpUserDts = useMutation({
    mutationKey: postSingUP(),
    mutationFn: (data: { phoneNumber: string }) => postSignUp({ data }),
  })

  const sendOptDetails = useMutation({
    mutationKey: sendOtpKey(),
    mutationFn: (data: { phoneNumber: string }) => sendOtp({ data }),
  })
  const signInUserDtls = useMutation({
    mutationKey: singUpKey(),
    mutationFn: (data: { phoneNumber: string; smsOtp: number }) =>
      singIn({ data }),
  })
  return { signUpUserDts, sendOptDetails, signInUserDtls }
}
