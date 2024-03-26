"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import "./index.css"

const PerFace: number[][] = [
  [-0.1, 0.3, -1],
  [-0.1, 0.6, -0.4],
  [-0.85, -0.42, 0.73],
  [-0.8, 0.3, -0.75],
  [0.3, 0.45, 0.9],
  [-0.16, 0.6, 0.18],
]

const Dice = ({
  setDiceVal,
}: {
  setDiceVal: Dispatch<SetStateAction<any>>
}) => {
  const setVal = (num: number) => {
    const transformValue = PerFace[num - 1].join(",")
    document
      .querySelector(".dice")!
      .setAttribute("style", `transform: rotate3d(${transformValue}, 180deg);`)
  }

  const handleThrowClick = () => {
    const diceVal = Math.floor(Math.random() * 5) + 1
    document.querySelector(".dice")!.classList.remove("throw", "rolling")
    setVal(diceVal)
    setTimeout(() => {
      document.querySelector(".dice")!.classList.add("throw")
    }, 50)
    setDiceVal(diceVal)
  }

  useEffect(() => {
    handleThrowClick()
  }, [])

  return (
    <div className="diceWrap absolute mt-[-50px]">
      <div className="dice rolling">
        <div className="diceFace front"></div>
        <div className="diceFace up"></div>
        <div className="diceFace left"></div>
        <div className="diceFace right"></div>
        <div className="diceFace bottom"></div>
        <div className="diceFace back"></div>
      </div>
    </div>
  )
}

export default Dice
