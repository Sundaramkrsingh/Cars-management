"use server"

import { cookies } from "next/headers"

export async function setAccessToken(data: string) {
  cookies().set("access-token", data)
}

export async function setRefreshToken(data: string) {
  cookies().set("refresh-token", data)
}

export async function getAccessToken() {
  return cookies().get("access-token")
}

export async function getRefreshToken() {
  return cookies().get("refresh-token")
}
