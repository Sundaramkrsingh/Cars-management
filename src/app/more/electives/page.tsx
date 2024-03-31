"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { parseAsString, useQueryState } from "nuqs"
import { craft, extra } from "./components/constants"
import Electives from "./components/electives"
import Skills from "./components/skills"

const Elective = () => {
  const [series, setSeries] = useQueryState(
    "series",
    parseAsString.withDefault("craft")
  )

  return (
    <div className="pt-3 p-5">
      <Tabs defaultValue={series}>
        <div className="flex w-full gap-2 items-center justify-center">
          <TabsList>
            <TabsTrigger
              className="px-4 w-1/3"
              onClick={() => setSeries("craft")}
              value="craft"
            >
              Craft series
            </TabsTrigger>
            <TabsTrigger
              className="px-4 w-1/3"
              onClick={() => setSeries("extra")}
              value="extra"
            >
              Extra series
            </TabsTrigger>
            <TabsTrigger
              className="px-4 w-1/3"
              onClick={() => setSeries("skill")}
              value="skill"
            >
              Skill series
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="craft">
          <Electives electiveData={craft} />
        </TabsContent>
        <TabsContent value="extra">
          <Electives electiveData={extra} />
        </TabsContent>
        <TabsContent value="skill">
          <Skills />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Elective
