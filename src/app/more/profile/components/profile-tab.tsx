"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { parseAsString, useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import type { EditVariants } from "../type"
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

type ProfileProps = PageProps & {}

const ProfileTab = ({ setEdit }: ProfileProps) => {
  const [type, setType] = useQueryState(
    "details",
    parseAsString.withDefault("personal")
  )

  const handelEditClick = (card: EditVariants) => {
    setEdit(card)
  }

  const commonProps = {
    onClick: handelEditClick,
    setEdit: setEdit,
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
        <div className="flex flex-col gap-5 pb-5">
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
