"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { parseAsString, useQueryState } from "nuqs"
import {
	Awards,
	BasicInformation,
	Education,
	Licenses,
	Profile,
	Projects,
	Resume,
	WorkExperience,
} from "./cards"

const ProfileTab = () => {
	const [type, setType] = useQueryState(
		"details",
		parseAsString.withDefault("personal")
	)

	return (
			<Tabs defaultValue={type}>
				<div className="flex w-full gap-2 items-center justify-center">
					<TabsList className="w-full bg-celadon-green">
						<TabsTrigger
							className="w-1/2"
							onClick={() => setType("personal")}
							value="personal"
						>
							Personal details
						</TabsTrigger>
						<TabsTrigger
							className="w-1/2"
							onClick={() => setType("elective")}
							value="elective"
						>
							Electives
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="personal" className="my-5">
					<div className="flex flex-col gap-5">
						<Profile />
						<WorkExperience />
						<Projects />
						<Licenses />
						<Education />
						<Awards />
						<Resume />
						<BasicInformation />
					</div>
				</TabsContent>
				<TabsContent value="elective" className="my-5">
					<div className="flex gap-[10px] justify-center items-end mt-4">
						Test 2
					</div>
				</TabsContent>
			</Tabs>
	)
}

export default ProfileTab
