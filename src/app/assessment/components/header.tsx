import { Icons } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
	return (
		<header className="flex items-end">
			<div className="py-4 px-2 sm:px-5 gap-2 h-16 flex w-3/4 bg-background rounded-t-2xl justify-center items-center">
				<Icons.leftArrow className="absolute left-5 h-7 w-7 cursor-pointer text-primary" />
				<Link href="/">
					<Image
						src="/bezt-logo.svg"
						height={36}
						width={36}
						alt="bezt-logo"
					/>
				</Link>
				<div>
					<h1 className="text-lg font-medium text-primary">FACETS</h1>
					<p className="text-base text-primary-foreground">
						MIX MODE | DAY 25
					</p>
				</div>
			</div>
			<div className="relative w-[40px] h-[40px]">
				<div className="absolute w-[32px] h-[32px] left-[-14px] top-[22px] rounded-full bg-background" />
				<div className="absolute bg-background w-[40px] h-[40px] bg-white rounded-full" />
			</div>
		</header>
	)
}

export default Header
