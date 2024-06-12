"use client"

import dataProvider from "@/dataProvider"
import { useUser } from "@/store/user-provider"
import { useMutation } from "@tanstack/react-query"

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

export const useAddTrumps = () => {
  const { id: userId } = useDetails()

  const postTrumpUsageKey = () => ["trumps"]

  const addTrumps = useMutation({
    mutationKey: postTrumpUsageKey(),
    mutationFn: (data: { powerUpId?: number; questionId: number }) =>
      postTrumpUsage({ userId, data }),
  })

  return { addTrumps }
}
