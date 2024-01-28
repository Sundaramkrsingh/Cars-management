"use client"
import { useState, createContext, useContext } from "react"
import { create } from "zustand"

type Counter = {
	count: number
}

const createStore = (counter: Counter) =>
	create<{
		counter: Counter
		setCounter: (counter: Counter) => void
	}>((set) => ({
		counter,
		setCounter(counter: Counter) {
			set({ counter })
		},
	}))

const CounterContext = createContext<ReturnType<typeof createStore> | null>(
	null
)

export const useCounter = () => {
	if (!CounterContext)
		throw new Error("useCounter must be used within a CounterProvider")
	return useContext(CounterContext)!
}

const CounterProvider = ({
	counter,
	children,
}: {
	counter: Counter
	children: React.ReactNode
}) => {
	const [store] = useState(() => createStore(counter))
	return (
		<CounterContext.Provider value={store}>
			{children}
		</CounterContext.Provider>
	)
}

export default CounterProvider
