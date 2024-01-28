import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/queryClient"
import { getUsersKey } from "@/query/user"
import { getUser } from "@/utils/api/user"

import HomePage from "@components/pages/Home"

export default async function Home() {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery({
		queryKey: getUsersKey(),
		queryFn: getUser,
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomePage />
		</HydrationBoundary>
	)
}
