"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { Header as MoreHeader } from "./header"
import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import Link from "next/link"
import { Icons } from "@/components/icons"

type LayoutProps = { children: React.ReactNode }

const More = ({ children }: LayoutProps) => {
	return (
		<>
			<MoreHeader />
			<div>{children}</div>
			<MobileNavigationBar />
		</>
	)
}

const Profile = ({ children }: LayoutProps) => {
	return (
		<>
			<div className="h-[65px] flex items-center gap-2 text-black p-5">
				<Link href="/">
					<Icons.leftArrow className="w-7 h-7" />
				</Link>
				<h1 className="font-medium text-lg">My profile</h1>
			</div>
			<div>{children}</div>
		</>
	)
}

function LayoutManager({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	const layoutMap = {
		"/more/profile": Profile,
		"/more": More,
	}

	const CurrentLayout = layoutMap[pathname as keyof typeof layoutMap]

	return <CurrentLayout>{children}</CurrentLayout>
}

export default LayoutManager
