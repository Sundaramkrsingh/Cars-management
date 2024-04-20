"use client"

import Button from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import React from "react"
import InfoCard from "./components/info-card"

const config = [
  {
    title: "Assess",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus enim sed lorem laoreet.",
  },
  {
    title: "ALIGN",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus enim sed lorem laoreet.",
  },
  {
    title: "ACHEIVE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus enim sed lorem laoreet.",
  },
]

const Intro = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-col items-center justify-center">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full mt-16"
        >
          <CarouselContent>
            {config.map(({ title, description }) => (
              <CarouselItem key={title}>
                <InfoCard title={title} description={description} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex gap-2 mt-20">
          {Array.from({ length: count }).map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "bg-platinum w-2 h-2 rounded-full",
                  current - 1 === idx && "bg-eucalyptus"
                )}
              />
            )
          })}
        </div>
      </div>

      <div className="p-5">
        <Button className="w-full" label="Next" />
      </div>
    </div>
  )
}

export default Intro
