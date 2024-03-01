import ChatProvider from "@/store/chat-provider"
import type { Metadata } from "next"
import Header from "./components/header"

export const metadata: Metadata = {
  title: "Assessment",
  description: "Generated by Bezt",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ChatProvider>
      <div className="fixed bg-white top-0 left-0 right-0 h-[111px] z-0" />
      <div className="bg-white w-[380px] no-scrollbar mx-auto relative z-1">
        <Header />
        <div className="h-assessment bg-[url('/stars.png')] bg-fixed bg-[center_top_95px] overflow-y-scroll no-scrollbar bg-no-repeat bg-background text-primary px-5 w-full rounded-e-2xl">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}
