import Link from "next/link"

export default async function Home() {
  return (
    <div className="text-center mt-5 text-white flex gap-4 justify-center">
      <Link href="/assessment" className="hover:underline">
        Assessment
      </Link>
      <Link href="/rankings" className="hover:underline">
        Rankings
      </Link>
      <Link href="/report" className="hover:underline">
        Report
      </Link>
      <Link href="/stats" className="hover:underline">
        Stats
      </Link>
    </div>
  )
}
