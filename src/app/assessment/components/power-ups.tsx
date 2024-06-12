// "use client"

// import { useChat } from "@/store/chat-provider"
// import { useState } from "react"
// import DiceDialog from "./dice-dialog"
// import PowerUpCard from "./power-up-card"
// import PreQHeading from "./pre-q-heading"

// const PowerUps = ({
//   questionnaire,
//   powerUps,
// }: {
//   questionnaire: number
//   powerUps: Array<any>
// }) => {
//   const [active, setActive] = useState<number | string | undefined>()

//   const { setPowerUp } = useChat()((state) => state)

//   const commonPowerUpProps = {
//     activeCard: active,
//     setActive,
//     active,
//     questionnaire,
//     powerUp: null,
//   }

//   powerUps
//     .filter((powerUp) => powerUp.id == 1 || powerUp.id == 2)
//     .forEach((powerUp) => {
//       commonPowerUpProps["powerUp"] = powerUp
//     })

//   return (
//     <div>
//       <PreQHeading heading="POWER-UPS" />
//       <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
//         <PowerUpCard
//           className="col-span-3 row-span-1 p-2"
//           description="+5 Seconds"
//           icon="power4"
//           id={1}
//           onClick={() => setPowerUp("PLUS_5_SECONDS")}
//           {...commonPowerUpProps}
//         />
//         <PowerUpCard
//           className="col-span-3 row-span-1 p-2"
//           description="+10 Seconds"
//           icon="power8"
//           id={2}
//           onClick={() => setPowerUp("PLUS_10_SECONDS")}
//           {...commonPowerUpProps}
//         />

//         {/* <PowerUpCard
//           className="col-span-2 row-span-1 p-2"
//           description="Twice Up"
//           icon="power2x"
//           state="in-active"
//           id={3}
//           onClick={() => setPowerUp("TWICE_UP")}
//           {...commonPowerUpProps}
//         />
//         <PowerUpCard
//           className="col-span-2 row-span-1 p-2"
//           description="Thrice Up"
//           icon="power3x"
//           id={4}
//           onClick={() => setPowerUp("THRICE_UP")}
//           {...commonPowerUpProps}
//         />
//         <DiceDialog
//           questionnaire={questionnaire}
//           className="col-span-2 row-span-1"
//         >
//           <PowerUpCard
//             className="col-span-2 row-span-1 p-2"
//             description="Dice Up"
//             icon="dice"
//             id={5}
//             onClick={() => setPowerUp("DICE_UP")}
//             {...commonPowerUpProps}
//           />
//         </DiceDialog> */}
//       </div>
//     </div>
//   )
// }

// export default PowerUps

"use client"

import { useChat } from "@/store/chat-provider"
import { useState } from "react"
import DiceDialog from "./dice-dialog"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"

const PowerUps = ({
  questionnaire,
  powerUps,
}: {
  questionnaire: number
  powerUps: Array<any>
}) => {
  const [active, setActive] = useState<number | string | undefined>()

  const { setPowerUp } = useChat()((state) => state)

  return (
    <div>
      <PreQHeading heading="POWER-UPS" />
      <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
        {powerUps
          .filter((powerUp) => powerUp.id == 1 || powerUp.id == 2)
          .map((powerUp) => (
            <PowerUpCard
              key={powerUp.id}
              className="col-span-3 row-span-1 p-2"
              description={powerUp.id === 1 ? "+5 Seconds" : "+10 Seconds"}
              icon={powerUp.id === 1 ? "power4" : "power8"}
              id={powerUp.id}
              onClick={() =>
                setPowerUp(
                  powerUp.id === 1 ? "PLUS_5_SECONDS" : "PLUS_10_SECONDS"
                )
              }
              activeCard={active}
              setActive={setActive}
              questionnaire={questionnaire}
              powerUp={powerUp}
            />
          ))}
      </div>
    </div>
  )
}

export default PowerUps
