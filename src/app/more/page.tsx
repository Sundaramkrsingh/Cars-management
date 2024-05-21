import MoreOptionsCard from "./components/more-options-card"
import ProfileSection from "./components/profile-section"
import ReferDrawer from "./components/refer-drawer"
import SocialNavbar from "./components/social-media-nav"

export default async function More() {
  return (
    <div className="pb-24">
      <ProfileSection />
      <div className="px-5 mt-4">
        <MoreOptionsCard />
        <SocialNavbar />
      </div>
    </div>
  )
}
