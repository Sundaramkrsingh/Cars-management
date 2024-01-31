import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

const PowerUps = () => {
	return (
		<div>
			<PreQHeading heading="POWER-UPS" />
			<div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
				<PowerUpCard
					className="col-span-3 row-span-1"
					description="+4 Seconds"
					icon="power4"
				/>
				<PowerUpCard
					className="col-span-3 row-span-1"
					description="+8 Seconds"
					icon="power8"
				/>

				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Twice Up"
					icon="power2x"
				/>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Thrice Up"
					icon="power3x"
				/>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Dice Up"
					icon="dice"
				/>
			</div>
		</div>
	)
}

export default PowerUps
