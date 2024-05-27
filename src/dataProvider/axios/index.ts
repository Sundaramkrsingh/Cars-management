import { ACCESS_TOKEN, REFRESH_TOKEN, userSessionActive } from "@/lib"
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { getAccessToken, setAccessToken, setRefreshToken } from "../auth-setter"

type PromiseHandlers = {
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}

const refreshUrl = "admin/refresh-token"
const signInUrl = "/auth/sign-in"
const validateTokenUrl = "admin/validate-reset-token"

const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

let isRefreshing = false

const failedAdminQueue: any = []

userInstance.interceptors.request.use(
  handleRequest as (req: AxiosRequestConfig) => Promise<any>
)
userInstance.interceptors.response.use(handleResponse, (error) =>
  handleError(error, userInstance, failedAdminQueue)
)

function processQueue(error: AxiosError, token = null) {
  ;[failedAdminQueue].forEach((failedQueue) => {
    failedQueue.forEach((promise: PromiseHandlers) => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })
    failedQueue.length = 0
  })
}

async function handleRequest(req: AxiosRequestConfig) {
  const accessToken = await getAccessToken()
  if (req.headers) {
    req.headers.Authorization = `Bearer ${accessToken?.value}`
  }

  return req
}

function handleResponse(response: AxiosResponse<any>) {
  if (
    response?.config &&
    [refreshUrl, signInUrl].includes(response?.config?.url as string)
  ) {
    /**
     * set token if user is verified
     */
    console.log({ response: response.data.data.token })

    setAccessToken(response.data.data.token)
    setRefreshToken(response.data.data.refreshToken)
  }

  return response
}

async function handleError(
  error: AxiosError<any>,
  instance: AxiosInstance,
  failedQueue: any[]
) {
  const status = error.response ? error.response.status : null
  const originalRequest = error.config as InternalAxiosRequestConfig<any>
  if (
    status === 401 &&
    ![refreshUrl, validateTokenUrl, signInUrl].includes(
      error?.config?.url as string
    )
  ) {
    /**
     * if access-token is expired, get new access-token from refresh-token and retry requests
     */

    if (isRefreshing) {
      /**
       * if refresh token api is pending, adding new request to failed queue
       */
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((accessToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

          return instance(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    isRefreshing = true

    return userInstance
      .post(refreshUrl, {
        refreshToken: localStorage.getItem(REFRESH_TOKEN),
      })
      .then(async (res) => {
        const accessToken = res?.headers && res.data.data.token
        const refreshToken = res?.headers && res.data.data.refreshToken

        setAccessToken(res.data.data.token)
        setRefreshToken(res.data.data.refreshToken)

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

        /**
         * processing all the failed request with new access token
         */
        return instance(originalRequest)
          .then((originalResponse) => {
            processQueue(
              null as unknown as AxiosError<unknown, any>,
              accessToken
            )

            return originalResponse
          })
          .catch((originalError) => {
            processQueue(originalError, null)

            return Promise.reject(originalError)
          })
      })
      .catch((err: AxiosError) => {
        if (err?.config?.url === refreshUrl) {
          localStorage.clear()
          window.location.reload()
        }

        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
  }

  return Promise.reject(error)
}

export default userInstance
