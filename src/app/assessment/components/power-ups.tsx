"use client"

import { useState } from "react"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

const PowerUps = () => {
	const [active, setActive] = useState<number | string | undefined>()

	const commonPowerUpProps = {
		activeCard: active,
		setActive,
	}

	return (
		<div>
			<PreQHeading heading="POWER-UPS" />
			<div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
				<PowerUpCard
					className="col-span-3 row-span-1 p-2"
					description="+4 Seconds"
					icon="power4"
					id={1}
					{...commonPowerUpProps}
				/>
				<PowerUpCard
					className="col-span-3 row-span-1 p-2"
					description="+8 Seconds"
					icon="power8"
					id={2}
					{...commonPowerUpProps}
				/>

				<PowerUpCard
					className="col-span-2 row-span-1 p-2"
					description="Twice Up"
					icon="power2x"
					state="in-active"
					id={3}
					{...commonPowerUpProps}
				/>
				<PowerUpCard
					className="col-span-2 row-span-1 p-2"
					description="Thrice Up"
					icon="power3x"
					id={4}
					{...commonPowerUpProps}
				/>
				<PowerUpCard
					className="col-span-2 row-span-1 p-2"
					description="Dice Up"
					icon="dice"
					state="in-active"
					id={5}
					{...commonPowerUpProps}
				/>
			</div>
		</div>
	)
}

export default PowerUps
