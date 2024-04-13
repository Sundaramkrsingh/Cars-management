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

const postAssessmentFeedBack = ({
  userId,
  data,
}: {
  userId: string | number
  data: { isPositive?: boolean; comment?: string; questionId: string | number }
}) => {
  const { questionId, ...rest } = data

  return fetcher.post(`/feed-back/${userId}/${questionId}`, rest)
}

export const useAddFeedback = () => {
  const { id: userId } = useDetails()

  const postAssessmentFeedBackKey = () => ["post-feedback"]

  const addFeedback = useMutation({
    mutationKey: postAssessmentFeedBackKey(),
    mutationFn: (data: {
      isPositive?: boolean
      comment?: string
      questionId: string | number
    }) => postAssessmentFeedBack({ userId, data }),
  })

  return { addFeedback }
}
