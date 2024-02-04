import { Icons } from "@/components/icons"
import type { Answer, Validity } from "../type"

type AnswerDialogueProps = Answer & {
	validity: Validity
}

const AnswerDialogue = ({
	selectedOption,
	optionValue,
	validity,
}: AnswerDialogueProps) => {
	const dialogueVariant = (variant: Validity) => {
		const variantUiConfig = {
			icon: { correct: "check", wrong: "cross", default: false },
			className: {
				correct: "!bg-aero-blue",
				wrong: "!bg-light-red",
				default: "",
			},
		}

		return {
			icon: variantUiConfig.icon[variant],
			className: variantUiConfig.className[variant],
		}
	}

	const isDefault = validity === "default"

	const Icon = Icons[dialogueVariant(validity).icon as keyof typeof Icons]

	return (
		<div className="w-full flex justify-end my-5 transition-all duration-500">
			{selectedOption && (
				<div
					className={`${
						dialogueVariant(validity).className
					} p-4 max-w-[300px] bg-white rounded-b-2xl rounded-tl-2xl overflow-hidden flex gap-2 justify-center items-center`}
				>
					<div
						className={`mr-2 rounded-lg ${
							isDefault ? "bg-aero-blue" : "bg-white"
						} text-foreground w-6 h-6 flex justify-center items-center transition-all duration-500`}
					>
						{optionValue}
					</div>
					<p className="text-black font-medium text-base">
						{selectedOption.label}
					</p>
					{dialogueVariant(validity).icon && (
						<Icon className="w-6 h-6 ml-2" />
					)}
				</div>
			)}
		</div>
	)
}

export default AnswerDialogue
