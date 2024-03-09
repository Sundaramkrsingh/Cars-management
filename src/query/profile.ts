import dataProvider from "@/dataProvider"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useUser } from "@/store/user-provider"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")

const dataManager = (profileData: any) => {
  const profileEdit = {
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    username: profileData?.username,
    bio: profileData?.bio,
    email: profileData?.email,
    avatar: {
      initials: "",
      bgColor: "",
      src: profileData?.avatar,
    },
  }

  const basicInformation = {
    email: profileData?.email,
    dob: profileData?.dob,
    address: `${profileData?.address?.line1}, ${profileData?.address?.cityDistrict}, ${profileData?.address?.state}, ${profileData?.address?.country}`,
  }

  const experience = () =>
    profileData?.workExperience.map((data: any) => ({
      ...data,
      startDate: data?.from,
      endDate: data?.to,
    }))

  const awards = () =>
    profileData?.awardAchievement.map((data: any) => ({
      ...data,
      link: data?.url,
    }))

  const education = () =>
    profileData?.education.map((data: any) => ({
      ...data,
      institution: data?.schoolCollage,
      startDate: data?.from,
      endDate: data?.to,
    }))

  const projects = () =>
    profileData?.project.map((data: any) => ({
      ...data,
      link: data?.url,
    }))

  const licenses = () =>
    profileData?.licenseCertification.map((data: any) => ({
      ...data,
      certification: data?.name,
      startDate: data?.from,
      expiryDate: data?.to,
      link: data?.url,
    }))

  return {
    profileEdit,
    basicInformation,
    experience: experience(),
    awards: awards(),
    education: education(),
    projects: projects(),
    licenses: licenses(),
  }
}

const getProfile = (id: string | number) => {
  return fetcher.get(`profiles/${id}`)
}

export const useProfile = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  const { setProfileFormData, profileFormData } = useProfileFromData()(
    (state) => state
  )

  const getProfileKey = () => ["profile", profileFormData]

  const profile = useQuery({
    queryKey: getProfileKey(),
    queryFn: () => getProfile(id),
  })

  const profileData = profile?.data?.data

  useEffect(() => {
    const {
      profileEdit,
      basicInformation,
      experience,
      awards,
      education,
      projects,
      licenses,
    } = dataManager(profileData)

    if (profile.isSuccess) {
      setProfileFormData({
        profileEdit,
        basicInformation,
        experience,
        awards,
        education,
        projects,
        licenses,
      } as any)
    }
  }, [profile.isSuccess, profileData, setProfileFormData])

  return { profile }
}
