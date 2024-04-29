"use client"

import dataProvider from "@/dataProvider"
import { useChat } from "@/store/chat-provider"
import { useUser } from "@/store/user-provider"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const useDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  return { id }
}

const useChatInfo = () => {
  const { ...chat } = useChat()((state) => state)

  return chat
}

const getQuestions = (userId: string | number) => {
  return fetcher.get(`/questions`)
}

export const useInQuestion = () => {
  const { id: userId } = useDetails()
  const { setQuestions, chat } = useChatInfo()

  const getQuestionsKey = () => ["questions"]

  const getInQuestions = useQuery({
    queryKey: getQuestionsKey(),
    queryFn: () => getQuestions(userId),
    select: (data) =>
      (data.data.data as any)?.map((itm: any) => ({
        preQ: {
          avgTime: itm?.avgTime,
          accuracy: itm?.accuracy,
          timeLimit: itm?.timeLimit,
          type: itm?.type,
          isActive: itm?.isActive,
          isPublished: itm?.isPublished,
          tags: itm?.tags,
          dynamicDL: itm?.dynamicDL,
          staticDL: itm?.staticDL,
          tier3Id: itm?.tier3Id,
          tier2Id: itm?.tier2Id,
          tier1Id: itm?.tier1Id,
        },
        inQ: {
          ...itm?.mCQQA,
          options: itm.mCQQA.options.map(({ id, text, position }: any) => ({
            label: text,
            value: text,
            id,
            position,
          })),
        },
        postQ: {
          triviaContent: itm?.mCQQA?.triviaContent,
        },
      })),
  })

  useEffect(() => {
    if (getInQuestions.isSuccess) {
      setQuestions(getInQuestions?.data)
    }
  }, [getInQuestions?.data, getInQuestions.isSuccess, setQuestions])

  return { getInQuestions }
}
