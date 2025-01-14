"use client"

import dataProvider from "@/dataProvider"
import { useChat } from "@/store/chat-provider"
import { useUser } from "@/store/user-provider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const useDetails = () => {
  const {
    user: { id },
    setUser,
  } = useUser()((state) => state)

  return { id, setUser }
}

const useChatInfo = () => {
  const { ...chat } = useChat()((state) => state)

  return chat
}

const getQuestions = (userId: string | number) => {
  return fetcher.get(`/core/${userId}`)
}

const getHomeData = () => {
  return fetcher.get(`/home`)
}

const postAnswer: (
  userId: number | string,
  data: {
    questionId: number
    currentQuestionNo: number
    timeSpent: number
    isQuestionSkipped: boolean
    answer?: string
  }
) => Promise<
  AxiosResponse<
    {
      data: {
        inQ: { questionId: number; isCorrect: boolean; score: number }
        postQ: { triviaContent: string }
      }
    },
    any
  >
> = (userId, data) => {
  return fetcher.post(`/core/${userId}/answer`, data)
}

export const useInQuestion = () => {
  const { id: userId } = useDetails()
  const { setQuestions, setAssessmentMetaData, chat } = useChatInfo()

  const getQuestionsKey = () => ["questions"]

  const getInQuestions = useQuery({
    queryKey: getQuestionsKey(),
    queryFn: () => getQuestions(userId),
    select: (data) => data.data.data,
  })

  useEffect(() => {
    if (getInQuestions.isSuccess) {
      const { core, ...rest } = getInQuestions.data

      setQuestions(
        core?.map((itm: any) => ({
          ...itm,
          inq: {
            ...itm?.inq,
            options: itm.inq.options.map(({ id, text, position }: any) => ({
              label: text,
              value: text,
              id,
              position,
            })),
          },
        }))
      )
      setAssessmentMetaData(rest)
    }
  }, [
    getInQuestions.data,
    getInQuestions.isSuccess,
    setAssessmentMetaData,
    setQuestions,
  ])

  return { getInQuestions }
}

export const usePostAnswer = () => {
  const { id: userId } = useDetails()

  const postAnswerKey = () => ["answer"]

  const postAns = useMutation({
    mutationKey: postAnswerKey(),
    mutationFn: (data: {
      questionId: number
      currentQuestionNo: number
      timeSpent: number
      isQuestionSkipped: boolean
      answer?: string
    }) => postAnswer(userId, data),
  })

  return {
    postAns,
  }
}

export const useHome = () => {
  const { setUser } = useDetails()
  const { setAssessmentMetaData } = useChatInfo()

  const getHomeKey = () => ["home"]

  const getHome = useQuery({
    queryKey: getHomeKey(),
    queryFn: () => getHomeData(),
    select: (data) => data.data.data,
  })

  useEffect(() => {
    if (getHome.isSuccess) {
      const { assessment } = getHome.data
      setUser({ id: assessment.userInfo.id })
      setAssessmentMetaData({ ...assessment })
    }
  }, [getHome.data, getHome.isSuccess, setAssessmentMetaData])

  return { getHome }
}
