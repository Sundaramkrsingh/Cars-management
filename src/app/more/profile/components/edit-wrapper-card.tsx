import { Icons } from "@/components/icons"
import React from "react"

type EditWrapperCardProps = {
	heading: string | React.ReactNode
	children: React.ReactNode
	onClick?: () => void
}

const EditWrapperCard = ({
	children,
	heading,
	onClick,
}: EditWrapperCardProps) => {
	return (
		<div className="p-5 edit-card-shadow flex flex-col w-full rounded-[10px]">
			<div className="w-full flex justify-between items-center mb-4">
				{typeof heading === "string" ? (
					<p className="text-[20px] font-medium">{heading}</p>
				) : (
					<>{heading}</>
				)}
				{onClick && (
					<Icons.edit onClick={onClick} className="cursor-pointer" />
				)}
			</div>
			{children}
		</div>
	)
}

export default EditWrapperCard
