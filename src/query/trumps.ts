"use client"

import dataProvider from "@/dataProvider"
import { useChat } from "@/store/chat-provider"
import { useUser } from "@/store/user-provider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const useDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  return { id }
}

const postTrumpUsage = ({
  userId,
  data,
}: {
  userId: string | number
  data: { powerUpId?: number; questionId: number }
}) => {
  return fetcher.post(`core/${userId}/trumps`, data)
}

const getTrumpsDetails = (userId: string | number) => {
  return fetcher.get(`core/${userId}/trumps`)
}

export const useAddTrumps = () => {
  const { id: userId } = useDetails()

  const addTrumps = useMutation({
    mutationFn: (data: { powerUpId?: number; questionId: number }) =>
      postTrumpUsage({ userId, data }),
  })

  return { addTrumps }
}

export const useTrumpsInfo = () => {
  const { id: userId } = useDetails()
  const { setTrumpsInfo } = useChat()((state) => state)

  const getTrumps = useQuery({
    queryKey: ["get-trumps", userId],
    queryFn: () => getTrumpsDetails(userId),
    select: (data) => data.data.data,
  })

  useEffect(() => {
    if (getTrumps.isSuccess) {
      setTrumpsInfo(getTrumps.data)
    }
  }, [getTrumps.isSuccess, setTrumpsInfo, getTrumps.data])

  return { getTrumps }
}
