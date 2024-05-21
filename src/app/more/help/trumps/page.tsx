"use client"

import NavigateHeader from "../../components/navigate-header"
import { navigateInfo } from "../../components/constants"
import { useQueryState, parseAsString } from "nuqs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrumpsHolder from "./components/trumps"
import { Foresights, Powerups, WildCards } from "./components/constants"

const Trumps = () => {
  const [trump, setTrump] = useQueryState(
    "trumps",
    parseAsString.withDefault("Foresights")
  )
  return (
    <>
      {navigateInfo
        .filter((item) => item.title === "Trumps")
        .map((item) => (
          <NavigateHeader key={item.title} {...item} />
        ))}
      <div className="mt-[18px]">
        <Tabs defaultValue={trump}>
          <div className="flex w-full gap-2 items-center justify-center">
            <TabsList>
              <TabsTrigger
                className="px-4 w-1/3"
                onClick={() => setTrump("Foresights")}
                value="Foresights"
              >
                foresights
              </TabsTrigger>
              <TabsTrigger
                className="px-4 w-1/3"
                onClick={() => setTrump("Powerups")}
                value="Powerups"
              >
                Powerups
              </TabsTrigger>
              <TabsTrigger
                className="px-4 w-1/3"
                onClick={() => setTrump("Wildcards")}
                value="Wildcards"
              >
                Wildcards
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Foresights">
            <TrumpsHolder trumpData={Foresights} />
          </TabsContent>
          <TabsContent value="Powerups">
            <TrumpsHolder trumpData={Powerups} />
          </TabsContent>
          <TabsContent value="Wildcards">
            <TrumpsHolder trumpData={WildCards} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Trumps
