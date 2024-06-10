"use client"
import { getAccessToken } from "@/dataProvider/auth-setter"
import { createContext, useContext, useEffect, useState } from "react"
import { create } from "zustand"
import { jwtDecode, JwtPayload } from "jwt-decode"

export type User = {
  id: string | number
}

interface CustomJwtPayload extends JwtPayload {
  id: string | number
}

const initialState: User = {
  id: "",
}

const createStore = (user: User) =>
  create<{
    user: User
    setUser: (data: User) => void
  }>((set) => ({
    user,
    setUser(data: User) {
      set((prev) => ({ ...prev, user: data }))
    },
  }))

const UserContext = createContext<ReturnType<typeof createStore> | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}

const UserProvider = ({
  user = initialState,
  children,
}: {
  user?: User
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(user))

  useEffect(() => {
    const fetchTokenAndSetUser = async () => {
      const token = await getAccessToken()
      if (token && token.value) {
        const decoded = jwtDecode<CustomJwtPayload>(token.value)
        store.setState({ user: { id: decoded.id } })
      }
    }
    fetchTokenAndSetUser()
  }, [store])

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}

export default UserProvider
