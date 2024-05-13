"use client"

import dataProvider from "@/dataProvider"
import { useUser } from "@/store/user-provider"
import { useMutation, useQuery } from "@tanstack/react-query"

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

const getGoals = () => {
  return fetcher.get(`profiles/goals`)
}

const patchGoals = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.patch(`/profiles/${id}/goal`, data)
}

const useDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  return { id }
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

export const useGoals = () => {
  const { id } = useDetails()

  const getGoalsKey = () => ["goals"]
  const patchGoalsExpKey = () => ["edit-goals"]

  const getAllGoals = useQuery({
    queryKey: getGoalsKey(),
    queryFn: () => getGoals(),
  })

  const editGoals = useMutation({
    mutationKey: patchGoalsExpKey(),
    mutationFn: (data: any) => patchGoals({ data, id }),
  })

  return { getAllGoals, editGoals }
}
