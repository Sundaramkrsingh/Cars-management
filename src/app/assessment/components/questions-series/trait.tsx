"use client"

import { Foresight } from "../../components"

const Trait = ({ ad = false }: { ad?: boolean }) => {
  return (
    <>
      <Foresight />
      {ad && (
        <div className="w-full h-[400px] rounded-[5px] bg-aero-blue animate-pulse" />
      )}
    </>
  )
}

export default Trait
