"use client"

import { createContext, useContext, useState } from "react"
import { create } from "zustand"

type ProfileEdit = {
  firstName: string
  lastName: string
  username: string
  bio: string
}

export type ProfileFromData = {
  profileEdit: ProfileEdit
}

const initialState: ProfileFromData = {
  profileEdit: {
    firstName: "",
    lastName: "",
    username: "@mariageorgebezt",
    bio: "",
  },
}

const createStore = (profileFormData: ProfileFromData) =>
  create<{
    profileFormData: ProfileFromData
    setProfileEdit: (data: ProfileEdit) => void
  }>((set) => ({
    profileFormData,
    setProfileEdit(data: ProfileEdit) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, profileEdit: data },
      }))
    },
  }))

const ProfileFromDataContext = createContext<ReturnType<
  typeof createStore
> | null>(null)

export const useProfileFromData = () => {
  if (!ProfileFromDataContext)
    throw new Error("useCounter must be used within a ChatProvider")
  return useContext(ProfileFromDataContext)!
}

const ProfileFromDataProvider = ({
  profileFormData = initialState,
  children,
}: {
  profileFormData?: ProfileFromData
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(profileFormData))
  return (
    <ProfileFromDataContext.Provider value={store}>
      {children}
    </ProfileFromDataContext.Provider>
  )
}

export default ProfileFromDataProvider
