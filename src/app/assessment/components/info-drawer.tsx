"use client"

import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const InfoCards = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <div className="flex gap-[11px] items-center">
      <div className="bg-azureish-white w-12 h-12 flex rounded-[10px] justify-center items-center">
        <Icon />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

const Foresight = () => {
  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Foresights are your prep guide before taking an assessment. They
          highlight key points and tips to keep in mind, providing an overview
          of question categories (Tier 2 & 3) you`ll encounter, along with the
          key metrics we use to score your answers.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div>
        <div className="flex gap-2 mb-5">
          <div className="rounded-full bg-crayola h-6 w-6 flex justify-center items-center">
            <span className="font-semibold text-black text-[10px]">FS</span>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium text-white">
            <div className="flex gap-2 items-center">
              <Icons.rightArrow className="w-3 h-3" />
              <p>Attitude Essentials</p>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.rightArrow className="w-3 h-3" />
              <p>Integrity & Ethics</p>
            </div>
          </div>
        </div>
        <p>
          This section shows from which topics the next question will come from.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Avg. time</p>
            <Icons.clock className="text-rackley w-4 h-4" />
          </div>
          <p className="text-sm">
            Average time taken by a user to answer the upcoming question
          </p>
        </div>
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Accuracy</p>
            <Icons.target className="text-rackley w-4 h-4 stroke-rackley" />
          </div>
          <p className="text-sm">
            Average accuracy % users who attempted the the upcoming question
          </p>
        </div>
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Time limit</p>
            <Icons.timeLimit className="w-4 h-4 fill-rackley stroke-rackley" />
          </div>
          <p className="text-sm">
            Total time given to attempt the upcoming question
          </p>
        </div>
      </div>
    </>
  )
}

const PowerUps = () => {
  const powerUpsConfig = [
    {
      icon: "info5Plus",
      title: "+5 seconds",
      description: "Get an extra 5 seconds to think through your answer.",
    },
    {
      icon: "info10Plus",
      title: "+10 seconds ",
      description:
        "Enjoy an additional 8 seconds to carefully consider your response.",
    },
    {
      icon: "info2X",
      title: "Twice Up",
      description: "Double your time limit for each question.",
    },
    {
      icon: "info3X",
      title: "Thrice Up",
      description:
        "Triple your time, offering ample opportunity to strategize and excel in every question.",
    },
    {
      icon: "infoDice",
      title: "Dice Up",
      description:
        "Quadruple the usual time, giving you four times longer to tackle each question.",
    },
  ]

  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Powerups are like extra boosts to help you choose the right answer.
          Depending on the foresights, you can select a suitable Powerup (if
          necessary) for your next assessment question
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-9">
        {powerUpsConfig.map(({ ...rest }, idx) => (
          <InfoCards key={idx} {...rest} />
        ))}
      </div>
    </>
  )
}

const WildCard = () => {
  const wildCardConfig = [
    {
      icon: "infoHalf",
      title: "Better Half",
      description: "You only get two options to choose from.",
    },
    {
      icon: "infoCharts",
      title: "Chosen One ",
      description:
        "Get the percentage of each option given  by different users",
    },
    {
      icon: "infoHeart",
      title: "Double edge",
      description: "You have two chances to pick the right answer.",
    },
    {
      icon: "infoTime",
      title: "Time Machine",
      description: "Brings back a question that you got wrong in the past.",
    },
    {
      icon: "infoAba",
      title: "Ask ABA",
      description:
        "ABA assists with your questions, but may occasionally provide incorrect answers.",
    },
  ]

  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Wildcards provide creative options for selecting the correct answer to
          your question, giving you flexibility and innovation in your
          responses.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-9">
        {wildCardConfig.map(({ ...rest }, idx) => (
          <InfoCards key={idx} {...rest} />
        ))}
      </div>
    </>
  )
}

const InfoDrawer = ({ onClick }: { onClick?: () => void }) => {
  const [tabVal, setTabVal] = useState<"foresight" | "power-ups" | "wildcards">(
    "foresight"
  )

  return (
    <Drawer>
      <DrawerTrigger>
        <Icons.info className="text-philippine-silver w-4 h-4 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="border-none bg-eagle-green p-5">
        <DrawerHeader className="w-full p-0 mb-5">
          <DrawerTitle className="text-2xl font-medium text-white text-left">
            Trumps information
          </DrawerTitle>
        </DrawerHeader>
        <Tabs defaultValue={tabVal}>
          <div className="flex w-full gap-2 items-center justify-center">
            <TabsList className="bg-dark-slate-gray w-full">
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("foresight")}
                value="foresight"
              >
                Foresight
              </TabsTrigger>
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("power-ups")}
                value="power-ups"
              >
                Power Ups
              </TabsTrigger>
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("wildcards")}
                value="wildcards"
              >
                Wildcards
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-dark-slate-gray p-5 mt-7 rounded-[10px] text-white mb-5">
            <TabsContent className="mt-0" value="foresight">
              <Foresight />
            </TabsContent>
            <TabsContent className="mt-0" value="power-ups">
              <PowerUps />
            </TabsContent>
            <TabsContent className="mt-0" value="wildcards">
              <WildCard />
            </TabsContent>
          </div>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
export default InfoDrawer
