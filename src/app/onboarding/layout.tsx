import UserInfoProvider from "@/store/sing-up-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Generated by Bezt",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserInfoProvider>
      <div className="bg-alice-blue w-[380px] no-scrollbar h-screen mx-auto relative z-1 overflow-y-scroll">
        <div>{children}</div>
      </div>
    </UserInfoProvider>
  )
}
