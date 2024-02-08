"use client"

import useTimer from "@/hooks/useTimer"
import { cn } from "@/lib/utils"

const Timer = () => {
	const [{ min, sec }, reset, isTimedOut] = useTimer(15)

	function getBackgroundColor(sec: number) {
		return sec <= 5
			? "bg-jelly-bean"
			: sec <= 10
			? "bg-royal-orange"
			: "bg-mountain-meadow"
	}

	return (
		<div
			className={cn(
				getBackgroundColor(sec),
				"absolute text-sm text-center w-[20%] right-5 bottom-4 font-semibold rounded-[10px] text-white px-4 py-2 transition-all duration-200"
			)}
		>
			{`${sec} | 15`}
		</div>
	)
}

export default Timer
