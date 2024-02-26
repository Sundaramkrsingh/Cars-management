import { Suspense } from "react"
import ProfileTab from "./components/profile-tab"

export default async function Profile() {

  // this is a test comment

  return (
    <div className="px-5 pt-2 text-black">
      <Suspense>
        <ProfileTab />
      </Suspense>
    </div>
  )
}
