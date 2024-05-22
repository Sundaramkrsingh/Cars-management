import type { NextRequest } from "next/server"

const authPages = ["/login", "/onboarding", "/sign-up"]

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("access-token")?.value
  const isAuthPage = authPages.includes(request.nextUrl.pathname)
  const from = request.nextUrl.pathname

  if (!currentUser && !isAuthPage) {
    return Response.redirect(
      new URL(`/sign-up?from=${encodeURIComponent(from)}`, request.url)
    )
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
