import { Icons } from "@/components/icons";
import { Foresight, PowerUps, WildCards } from "./components";

export default async function Chat() {
	return (
		<>
			<Icons.info className="text-philippine-silver w-4 h-4 mb-2" />
			<div className="relative p-5 w-[300px] bg-foreground rounded-b-2xl rounded-e-2xl overflow-hidden flex flex-col gap-7">
				<div className="border-gradient top-0 left-0 absolute" />
				<Foresight />
				<PowerUps />
				<WildCards />
			</div>
		</>
	);
}
