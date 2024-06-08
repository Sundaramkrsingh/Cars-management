import React from "react"

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-[380px] absolute inset-0 z-50 bg-[#DD4040]">
      <h2>
        <p className="text-xl text-black text-bold">Loading screen</p>
      </h2>
    </div>
  )
}

export default loading
