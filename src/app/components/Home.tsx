"use client"

import { useUsers } from "@query/user"
import { useCounter } from "@store/CounterProvider"

const Home = () => {
	const usersQuery = useUsers()

	console.log(usersQuery?.data?.data)

	const setCounter = useCounter()((state) => state.setCounter)
	const currentCount = useCounter()((state) => state.counter.count)

	return (
		<div>
			Home
			{+currentCount}
			<button
				className="mt-6 px-8 py-2 text-lg font-bold text-white bg-blue-800 rounded-lg"
				onClick={async () => setCounter({ count: currentCount + 1 })}
			>
				Add To Counter
			</button>
		</div>
	)
}

export default Home
