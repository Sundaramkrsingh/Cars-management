"use client"

import dataProvider from "@/dataProvider"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useUser } from "@/store/user-provider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const postSignUp = ({ data }: { data: { phoneNumber: string } }) => {
  return fetcher.post(`/auth/sign-up-temp`, data)
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

const postGoals = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/goal`, data)
}

const getHearAboutUs = () => {
  return fetcher.get(`/profiles/hear-about-us`)
}

const patchHearAboutUs = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/hear-about-us`, data)
}

const updateHearAboutUs = ({
  id,
  data,
}: {
  id: string | number
  data: any
}) => {
  return fetcher.patch(`/profiles/${id}/hear-about-us`, data)
}

const getRoles = () => {
  return fetcher.get(`/profiles/current-role`)
}

const patchRoles = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.put(`/profiles/${id}/current-role`, data)
}

const postProfile = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/basic`, data)
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
  const addGoals = () => ["post-goals"]

  const getAllGoals = useQuery({
    queryKey: getGoalsKey(),
    queryFn: () => getGoals(),
  })

  const editGoals = useMutation({
    mutationKey: patchGoalsExpKey(),
    mutationFn: (data: any) => patchGoals({ id, data }),
  })

  const createGoals = useMutation({
    mutationKey: addGoals(),
    mutationFn: (data: any) => postGoals({ id, data }),
  })

  return { getAllGoals, editGoals, createGoals }
}

export const useHearAboutUs = () => {
  const { id } = useDetails()

  const getHearAboutUsKey = () => ["hear-about-us"]
  const patchHearAboutUsKey = () => ["edit-hear-about-us"]
  const updateHearAboutUsKey = () => ["update-hear-about-us"]

  const getAllHearAboutUs = useQuery({
    queryKey: getHearAboutUsKey(),
    queryFn: () => getHearAboutUs(),
  })

  const editHearAboutUs = useMutation({
    mutationKey: patchHearAboutUsKey(),
    mutationFn: (data: any) => patchHearAboutUs({ data, id }),
  })

  const updateHearAboutUsDts = useMutation({
    mutationKey: updateHearAboutUsKey(),
    mutationFn: (data: any) => updateHearAboutUs({ data, id }),
  })

  return { getAllHearAboutUs, editHearAboutUs, updateHearAboutUsDts }
}

export const useCurrentRoles = () => {
  const { id } = useDetails()

  const getRolesKey = () => ["roles"]
  const patchRolesExpKey = () => ["edit-roles"]

  const getAllRoles = useQuery({
    queryKey: getRolesKey(),
    queryFn: () => getRoles(),
  })

  const editCurrentRoles = useMutation({
    mutationKey: patchRolesExpKey(),
    mutationFn: (data: any) => patchRoles({ data, id }),
  })

  return { getAllRoles, editCurrentRoles }
}

export const useInitProfile = () => {
  const { id } = useDetails()

  const postProfileKey = () => ["post-profile"]

  const createProfile = useMutation({
    mutationKey: postProfileKey(),
    mutationFn: (data: any) => postProfile({ id, data }),
  })

  return { createProfile }
}
