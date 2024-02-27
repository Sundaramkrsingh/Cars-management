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
import type { EditVariants } from "../type"

const ProfileTab = () => {
  const [type, setType] = useQueryState(
    "details",
    parseAsString.withDefault("personal")
  )

  const [_, setEdit] = useQueryState("edit")

  const handelEditClick = (card: EditVariants) => {
    setEdit(card)
  }

  const commonProps = {
    onClick: handelEditClick,
  }

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
          <Profile {...commonProps} />
          <WorkExperience {...commonProps} />
          <Projects {...commonProps} />
          <Licenses {...commonProps} />
          <Education {...commonProps} />
          <Awards {...commonProps} />
          <Resume />
          <BasicInformation {...commonProps} />
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
