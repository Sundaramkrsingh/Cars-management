import { Icons } from "@/components/icons"
import Image from "next/image"
import React from "react"

type PostQCardProps = {
	image: string
	description: string
}

const PostQCard = ({ image, description }: PostQCardProps) => {
	return (
		<div className="p-4 bg-white rounded-2xl flex flex-col gap-3 overflow-hidden relative">
			<div className="w-full overflow-hidden relative rounded-2xl h-[170px]">
				<Image
					src={image}
					alt="descriptive-image"
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<div className="flex gap-1 items-center">
				<Icons.bulb />
				<p className="text-dark-liver text-sm font-semibold">
					DID YOU KNOW
				</p>
			</div>
			<p className="text-black font-medium mt-[-4px] z-10">
				{description}
			</p>
			<div className="absolute h-[90px] bg-middle-blue-green w-[50px] bottom-0 right-0 opacity-50" />
			<div className="absolute h-[60px] bg-aero-blue w-[40px] bottom-0 right-[50px] opacity-50" />
		</div>
	)
}

export default PostQCard
