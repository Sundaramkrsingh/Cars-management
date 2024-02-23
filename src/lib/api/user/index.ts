import dataProvider from "@/dataProvider"

let fetcher = dataProvider("adminInstance")

export const getUser = async () => {
  return fetcher.get("https://jsonplaceholder.typicode.com/users")
}
