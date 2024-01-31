import { Icons } from "@/components/icons"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

const WildCards = () => {
	return (
		<div>
			<PreQHeading heading="WILDCARDS" />
			<div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
				<div
					className={`col-span-2 row-span-2 flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-2`}
				>
					<Icons.aba className="ml-[-12px]" />
					<p className="text-black text-xs font-medium">Ask ABA</p>
				</div>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Thrice Up"
					icon="power3x"
				/>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Thrice Up"
					icon="power3x"
				/>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Thrice Up"
					icon="power3x"
				/>
				<PowerUpCard
					className="col-span-2 row-span-1"
					description="Thrice Up"
					icon="power3x"
				/>
			</div>
		</div>
	)
}

export default WildCards
