import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import React from "react"

const PostQAnswer = () => {
	return (
		<div className="w-answer absolute bottom-5 justify-between flex z-10">
			<div className="h-14 w-[236px] flex gap-[2px]">
				<button
					onClick={() => {}}
					className={cn(
						"h-full w-1/4 bg-moonstone-blue flex justify-center items-center text-xl text-dark-slate-gray transition-all duration-500 rounded-l-2xl"
					)}
				>
					<Icons.like />
				</button>
				<button
					onClick={() => {}}
					className={cn(
						"h-full w-1/4 bg-moonstone-blue flex justify-center items-center text-xl text-dark-slate-gray transition-all duration-500 rounded-r-2xl"
					)}
				>
					<Icons.disLike />
				</button>
			</div>

			<button
				className={cn("h-14 w-14 play-button z-20")}
				onClick={() => {}}
			>
				<Icons.play />
			</button>
		</div>
	)
}

export default PostQAnswer
