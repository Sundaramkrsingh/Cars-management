"use client"

import { useEffect, useState } from "react"
import InQ from "./components/in-q"
import PostQ from "./components/post-q"
import { PreQ } from "./components/pre-q"
import PreQChip from "./components/pre-q-chip"
import { cn } from "@/lib/utils"

const TransitionWrapper = ({
	children,
	show,
	id,
}: {
	children: React.ReactNode
	show: boolean
	id: string
}) => (
	<div
		id={id}
		className={cn(
			"transition-all duration-500 scroll-mx-5",
			show ? "opacity-100 visible" : "opacity-0 invisible absolute top-0"
		)}
	>
		{children}
	</div>
)

export default function Chat() {
	const [showPreQ, setShowPreQ] = useState(false)
	const [showInQ, setShowInQ] = useState(false)
	const [showPostQ, setShowPostQ] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowPreQ(true)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [])

	return (
		<>
			<TransitionWrapper show={showPreQ} id="pre-q">
				<PreQChip />
				<PreQ setShowInQ={setShowInQ} />
			</TransitionWrapper>

			<TransitionWrapper show={showInQ} id="in-q">
				<InQ setShowPostQ={setShowPostQ} />
			</TransitionWrapper>
			<TransitionWrapper show={showPostQ} id="post-q">
				<PostQ />
			</TransitionWrapper>
		</>
	)
}
