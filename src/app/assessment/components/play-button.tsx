import { Icons } from "@/components/icons";

type PlayButtonProps = {
	onClick?: () => void;
};

const PlayButton = ({ onClick }: PlayButtonProps) => {
	return (
		<button
			className="h-14 w-14 play-button fixed bottom-5 right-5"
			onClick={onClick}
		>
			<Icons.play />
		</button>
	);
};

export default PlayButton;
