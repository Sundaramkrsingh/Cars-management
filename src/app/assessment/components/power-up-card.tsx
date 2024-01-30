import { Icons } from "@/components/icons"

type CardProps = {
	className: string
	icon: string
	description: string
	state?: "default" | "locked" | "in-active"
}

const DefaultCard = ({ className, icon, description, state }: CardProps) => {
	const isInActive = state === "in-active"
	const Icon = Icons[icon as keyof typeof Icons]

	return (
		<div
			className={`${className} relative flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-2 cursor-pointer overflow-hidden`}
		>
			{isInActive && (
				<div className="absolute w-full h-full bg-moonstone-blue opacity-80" />
			)}
			<Icon />
			<p className="text-black text-xs font-medium"> {description}</p>
		</div>
	)
}

const LockedCard = ({ className }: { className: string }) => (
	<div
		className={`${className} flex flex-col gap-1 bg-transparent justify-center items-center rounded-lg p-2 border border-crystal-blue`}
	>
		<Icons.lock />
		<p className="text-xs font-medium">Unlock with streak</p>
	</div>
)

const PowerUpCard = ({ state = "default", ...rest }: CardProps) => {
	const isLocked = state === "locked"

	return (
		<>
			{isLocked ? (
				<LockedCard className={rest.className} />
			) : (
				<DefaultCard {...rest} />
			)}
		</>
	)
}

export default PowerUpCard
