import type { Metadata } from "next"
import Header from "./components/header"

export const metadata: Metadata = {
	title: "Report",
	description: "Generated by Bezt",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-alice-blue w-[380px] h-screen mx-auto relative z-1 px-5">
			<Header />
			<div>{children}</div>
		</div>
	)
}
