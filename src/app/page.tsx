import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-center mt-5 text-white">
      <Link href="/assessment" className="hover:underline">
        Assessment
      </Link>
    </div>
  );
}
