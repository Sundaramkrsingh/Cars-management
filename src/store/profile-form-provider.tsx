"use client"

import { createContext, useContext, useState } from "react"
import { create } from "zustand"

type ProfileEdit = {
  firstName: string
  lastName: string
  username: string
  bio: string
  email: string
  avatar?: {
    initials: string
    bgColor: string
    src: null
  }
}

type Experience = {
  title: string
  company: string
  startDate: Date | string
  endDate: Date | string
}

type Project = {
  title: string
  description: string
  link: string
}

type Licenses = {
  certification: string
  provider: string
  startDate: string | Date
  expiryDate: string | Date
  link: string
  companyImage?: string
}

type Education = {
  institution: string
  degree: string
  startDate: string
  endDate: string
}

type Awards = {
  title: string
  description: string
  link: string
}
type BasicInformation = {
  email?: string
  phoneNumber?: string
  dob?: string
  address?: string
}

export type ProfileFromData = {
  profileEdit: ProfileEdit
  experience: Experience[]
  projects: Project[]
  licenses: Licenses[]
  education: Education[]
  awards: Awards[]
  basicInformation: BasicInformation
}

const initialState: ProfileFromData = {
  profileEdit: {
    avatar: { initials: "MG", bgColor: "#F8F98F", src: null },
    firstName: "Maria",
    lastName: "George",
    username: "@mariageorgebezt",
    bio: "Product Designer | Global profile of 300 + clients | Bridging Business Goals with Exceptional User Experiences | AI/M practitioner",
    email: "@mariageorgebezt",
  },
  experience: [
    {
      title: "Product Designer",
      company: "UST Global ",
      startDate: "Tue Mar 05 2022 21:33:10 GMT+0530 (India Standard Time)",
      endDate: "Tue Mar 05 2023 21:33:10 GMT+0530 (India Standard Time)",
    },
    {
      title: "Visual Design Intern",
      company: "Google Pay",
      startDate: "Tue Mar 05 2023 21:33:10 GMT+0530 (India Standard Time)",
      endDate: "Tue Mar 05 2024 21:33:10 GMT+0530 (India Standard Time)",
    },
  ],
  projects: [
    {
      title: "Salesmate- Advanced CRM Platform",
      description:
        "- B2B CRM product targeted for sales team to increase overall performance - Increased team sales by 37%",
      link: "#",
    },
    {
      title: "Air Bnb seller rooms feature",
      description:
        "- Ideated on concepts to integrate AI for easing seller room creation - Decreased user dropout rate by 12 which lead to increase in avg number of seller profiles created",
      link: "#",
    },
  ],
  licenses: [
    {
      companyImage: "/kaggle.svg",
      certification: "Microsoft level 1 UX certification",
      provider: "Microsoft inc",
      startDate: "Aug 2022",
      expiryDate: "Aug 2023",
      link: "#",
    },

    {
      companyImage: "/course.svg",
      certification: "Google user flows course",
      provider: "Coursera",
      startDate: "Aug 2022",
      expiryDate: "Aug 2027",
      link: "#",
    },
  ],
  education: [
    {
      institution: "IIT , Roorkee",
      degree: "M tech, Web Design and Development",
      startDate: "Aug 2022",
      endDate: "Aug 2022",
    },
    {
      institution: "SRM University",
      degree: "B tech, Computer Science",
      startDate: "Aug 2022",
      endDate: "Aug 2022",
    },
  ],
  awards: [
    {
      title: "All India Hackathon 2nd prize",
      description:
        "2nd prize for automated attendence taker product for all India level hackathon",
      link: "#",
    },

    {
      title: "Top 100  product design challenger",
      description:
        "Best product design challenger for DesignUp challenge with around 3 lacks participants from all over the world",
      link: "#",
    },
  ],
  basicInformation: {
    email: "maria@gmail.com",
    phoneNumber: "731822446",
    dob: "15 September 2024",
    address:
      "Habibullah Rd, Satyamurthy Nagar, T. Nagar, Chennai, Tamil Nadu 600017",
  },
}

const createStore = (profileFormData: ProfileFromData) =>
  create<{
    profileFormData: ProfileFromData
    setProfileFormData: (data: ProfileFromData) => void

    setProfileEdit: (data: ProfileEdit) => void

    setExperience: (data: Experience) => void
    setExperienceEdit: (data: Experience, idx: number) => void

    setProject: (data: Project) => void
    setProjectEdit: (data: Project, idx: number) => void

    setLicenses: (data: Licenses) => void
    setLicenseEdit: (data: Licenses, idx: number) => void

    setEducation: (data: Education) => void
    setEducationEdit: (data: Education, idx: number) => void

    setAwards: (data: Awards) => void
    setAwardEdit: (data: Awards, idx: number) => void

    setBasicInfo: (data: BasicInformation) => void
  }>((set) => ({
    profileFormData,
    setProfileFormData(data: ProfileFromData) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, ...data },
      }))
    },

    setProfileEdit(data: ProfileEdit) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, profileEdit: data },
      }))
    },

    setExperience(data: Experience) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          experience: [...prev.profileFormData.experience, data],
        },
      }))
    },
    setExperienceEdit(data: Experience, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          experience: prev.profileFormData.experience.map((exp, i) =>
            i === index ? { ...exp, ...data } : exp
          ),
        },
      }))
    },

    setProject(data: Project) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          projects: [...prev.profileFormData.projects, data],
        },
      }))
    },
    setProjectEdit(data: Project, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          projects: prev.profileFormData.projects.map((exp, i) =>
            i === index ? { ...exp, ...data } : exp
          ),
        },
      }))
    },

    setLicenses(data: Licenses) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          licenses: [...prev.profileFormData.licenses, data],
        },
      }))
    },
    setLicenseEdit(data: Licenses, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          licenses: prev.profileFormData.licenses.map((lic, i) =>
            i === index ? { ...lic, ...data } : lic
          ),
        },
      }))
    },

    setEducation(data: Education) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          education: [...prev.profileFormData.education, data],
        },
      }))
    },
    setEducationEdit(data: Education, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          education: prev.profileFormData.education.map((edu, i) =>
            i === index ? { ...edu, ...data } : edu
          ),
        },
      }))
    },

    setAwards(data: Awards) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          awards: [...prev.profileFormData.awards, data],
        },
      }))
    },
    setAwardEdit(data: Awards, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          awards: prev.profileFormData.awards.map((award, i) =>
            i === index ? { ...award, ...data } : award
          ),
        },
      }))
    },

    setBasicInfo(data: BasicInformation) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, basicInformation: data },
      }))
    },
  }))

const ProfileFromDataContext = createContext<ReturnType<
  typeof createStore
> | null>(null)

export const useProfileFromData = () => {
  if (!ProfileFromDataContext)
    throw new Error("useCounter must be used within a ChatProvider")
  return useContext(ProfileFromDataContext)!
}

const ProfileFromDataProvider = ({
  profileFormData = initialState,
  children,
}: {
  profileFormData?: ProfileFromData
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(profileFormData))
  return (
    <ProfileFromDataContext.Provider value={store}>
      {children}
    </ProfileFromDataContext.Provider>
  )
}

export default ProfileFromDataProvider
