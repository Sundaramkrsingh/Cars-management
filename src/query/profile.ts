"use client"

import dataProvider from "@/dataProvider"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useUser } from "@/store/user-provider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

let fetcher = dataProvider("userInstance")
let formTypeFetcher = dataProvider("userInstance", "multipart/form-data")

const profileDataManager = (profileData: any) => {
  const profileEdit = {
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    username: profileData?.username,
    bio: profileData?.bio,
    email: profileData?.email,
    avatar: {
      initials: getFirstNameLastNameInitials(
        profileData?.firstName,
        profileData?.lastName
      ),
      bgColor: "",
    },
  }

  const basicInformation = {
    email: profileData?.email,
    dob: profileData?.dob,
    address: `${profileData?.address?.line1}, ${profileData?.address?.cityDistrict}, ${profileData?.address?.state}, ${profileData?.address?.country}`,
  }

  const experience = () =>
    profileData?.workExperience?.map((data: any) => ({
      ...data,
      startDate: data?.from,
      endDate: data?.to,
    }))

  const awards = () =>
    profileData?.awardAchievement?.map((data: any) => ({
      ...data,
      link: data?.url || "#",
    }))

  const education = () =>
    profileData?.education?.map((data: any) => ({
      ...data,
      institution: data?.schoolCollage,
      startDate: data?.from,
      endDate: data?.to,
    }))

  const projects = () =>
    profileData?.project?.map((data: any) => ({
      ...data,
      link: data?.url || "#",
    }))

  const licenses = () =>
    profileData?.licenseCertification?.map((data: any) => ({
      ...data,
      certification: data?.name,
      startDate: data?.from,
      expiryDate: data?.to,
      link: data?.url || "#",
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
  return fetcher.get(`profiles/profile/${id}`)
}

const getProfileImage = (id: string | number) => {
  return fetcher.get(`profiles/${id}/profile-image`)
}

const deleteProfileImg = (id: string | number) => {
  return fetcher.delete(`profiles/${id}/profile-image`)
}

const getResume = (id: string | number) => {
  return fetcher.get(`profiles/${id}/profile-resume`)
}

const deleteResume = (id: string | number) => {
  return fetcher.delete(`profiles/${id}/profile-resume`)
}

const postWorkExp = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/work-experience`, data)
}

const patchWorkExp = ({ id, data }: { id: string | number; data: any }) => {
  const { id: workExperienceId } = data

  return fetcher.patch(
    `/profiles/${id}/work-experience/${workExperienceId}`,
    data
  )
}

const deleteWorkExp = ({ id, data }: { id: string | number; data: any }) => {
  const { id: workExperienceId } = data

  return fetcher.delete(`/profiles/${id}/work-experience/${workExperienceId}`)
}

const postProject = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/project`, data)
}

const patchProject = ({ id, data }: { id: string | number; data: any }) => {
  const { id: projectId } = data

  return fetcher.patch(`/profiles/${id}/project/${projectId}`, data)
}

const deleteProject = ({ id, data }: { id: string | number; data: any }) => {
  const { id: projectId } = data

  return fetcher.delete(`/profiles/${id}/project/${projectId}`)
}

const postLicenseCertification = ({
  id,
  data,
}: {
  id: string | number
  data: any
}) => {
  return fetcher.post(`/profiles/${id}/license-certification`, data)
}

const patchLicenseCertification = ({
  id,
  data,
}: {
  id: string | number
  data: any
}) => {
  const { id: licenseCertificationId } = data

  return fetcher.patch(
    `/profiles/${id}/license-certification/${licenseCertificationId}`,
    data
  )
}

const deleteLicenseCertification = ({
  id,
  data,
}: {
  id: string | number
  data: any
}) => {
  const { id: licenseCertificationId } = data

  return fetcher.delete(
    `/profiles/${id}/license-certification/${licenseCertificationId}`
  )
}

const postEducation = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/education`, data)
}

const patchEducation = ({ id, data }: { id: string | number; data: any }) => {
  const { id: educationId } = data

  return fetcher.patch(`/profiles/${id}/education/${educationId}`, data)
}

const deleteEducation = ({ id, data }: { id: string | number; data: any }) => {
  const { id: educationId } = data

  return fetcher.delete(`/profiles/${id}/education/${educationId}`)
}

const postAward = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.post(`/profiles/${id}/award-achievement`, data)
}

const patchAward = ({ id, data }: { id: string | number; data: any }) => {
  const { id: awardAchievementId } = data

  return fetcher.patch(
    `/profiles/${id}/award-achievement/${awardAchievementId}`,
    data
  )
}

const deleteAward = ({ id, data }: { id: string | number; data: any }) => {
  const { id: awardAchievementId } = data

  return fetcher.delete(
    `/profiles/${id}/award-achievement/${awardAchievementId}`
  )
}

const patchBasicInfo = ({ id, data }: { id: string | number; data: any }) => {
  return fetcher.patch(`/profiles/${id}/basic`, data)
}

const postProfileImage = ({ id, data }: { id: string | number; data: any }) => {
  return formTypeFetcher.put(`/profiles/${id}/profile-image`, data)
}

const postResume = ({ id, data }: { id: string | number; data: any }) => {
  return formTypeFetcher.put(`/profiles/${id}/upload-resume`, data)
}

const useDetails = () => {
  const {
    user: { id },
  } = useUser()((state) => state)

  const {
    setProfileFormData,
    profileFormData,
    setProfileImageData,
    setResumeData,
    setResumeName,
  } = useProfileFromData()((state) => state)

  return {
    id,
    setProfileFormData,
    profileFormData,
    setProfileImageData,
    setResumeData,
    setResumeName,
  }
}

export const useProfile = () => {
  const {
    id,
    setProfileFormData,
    setProfileImageData,
    setResumeData,
    setResumeName,
  } = useDetails()

  const getProfileKey = () => ["profile"]
  const postProfileKey = () => ["post-profile"]
  const getProfileImageKey = () => ["profile-image"]
  const getResumeKey = () => ["resume-key"]
  const deleteProfileImage = () => ["delete-profile-img"]
  //fetch Image Url
  const getImage = useQuery({
    queryKey: getProfileImageKey(),
    queryFn: () => getProfileImage(id),
  })
  const getResumeDtls = useQuery({
    queryKey: getResumeKey(),
    queryFn: () => getResume(id),
  })

  const profile = useQuery({
    queryKey: getProfileKey(),
    queryFn: () => getProfile(id),
  })

  const deleteProfileImgReq = useMutation({
    mutationKey: deleteProfileImage(),
    mutationFn: () => deleteProfileImg(id),
  })

  const profileData = profile?.data?.data?.data
  let profileImage: string = ""
  if (profileData?.avatar) {
    if (getImage?.isSuccess) {
      profileImage = getImage?.data?.data?.data?.userAvatar
    }
  }
  let userResumeData: string = ""
  let userResumeName: string = ""

  if (getResumeDtls?.isSuccess) {
    const resumeUrl = getResumeDtls?.data?.data?.data?.userResume
    const resumeFilN = getResumeDtls?.data?.data?.data?.resumeFileName
    const setResumeDataInfo = {
      resumeDownloadUrl: resumeUrl,
      resumeName: resumeFilN,
    }
    userResumeName = getResumeDtls?.data?.data?.data?.resumeFileName
    userResumeData = getResumeDtls?.data?.data?.data?.userResume
  }

  useEffect(() => {
    const {
      profileEdit,
      basicInformation,
      experience,
      awards,
      education,
      projects,
      licenses,
    } = profileDataManager(profileData)

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
    if (profileImage) {
      setProfileImageData(profileImage)
    }

    if (userResumeData) {
      setResumeName(userResumeName)
      setResumeData(userResumeData)
    }
  }, [
    profile.isSuccess,
    profileData,
    profileImage,
    setProfileFormData,
    userResumeData,
  ])

  return { profile, getImage, getResumeDtls, deleteProfileImgReq }
}

export const useBasicInfo = () => {
  const { id } = useDetails()

  const patchBasicInfoKey = () => ["edit-work-exp"]

  const editBasicInfo = useMutation({
    mutationKey: patchBasicInfoKey(),
    mutationFn: (data) => patchBasicInfo({ id, data }),
  })

  return { editBasicInfo }
}

export const useWorkExperience = () => {
  const { id } = useDetails()
  const router = useRouter()

  const postWorkExpKey = () => ["add-work-exp"]
  const patchWorkExpKey = () => ["edit-work-exp"]
  const removeWorkExpKey = () => ["remove-work-exp"]

  const addWorkExp = useMutation({
    mutationKey: postWorkExpKey(),
    mutationFn: (data) => postWorkExp({ id, data }),
  })

  const editWorkExp = useMutation({
    mutationKey: patchWorkExpKey(),
    mutationFn: (data) => patchWorkExp({ id, data }),
  })

  const removeWorkExp = useMutation({
    mutationKey: removeWorkExpKey(),
    mutationFn: (data) => deleteWorkExp({ id, data }),
    onSuccess: () => {
      router.push("/more/profile?edit=work-experience")
    },
  })

  return { addWorkExp, editWorkExp, removeWorkExp }
}

export const useProject = () => {
  const { id, profileFormData } = useDetails()
  const router = useRouter()

  const postProjectKey = () => ["add-project"]
  const patchProjectKey = () => ["edit-project"]
  const deleteProjectKey = () => ["edit-project"]

  const addProject = useMutation({
    mutationKey: postProjectKey(),
    mutationFn: (data) => postProject({ id, data }),
  })

  const editProject = useMutation({
    mutationKey: patchProjectKey(),
    mutationFn: (data) => patchProject({ id, data }),
  })

  const removeProj = useMutation({
    mutationKey: deleteProjectKey(),
    mutationFn: (data) => deleteProject({ id, data }),
    onSuccess: () => {
      router.push("/more/profile?edit=projects")
    },
  })

  return { addProject, editProject, removeProj }
}

export const useLicenseCertification = () => {
  const { id } = useDetails()
  const router = useRouter()

  const postLicenseCertificationKey = () => ["add-use-license-certification"]
  const patchLicenseCertificationKey = () => ["edit-use-license-certification"]
  const deleteLicenseCertificationKey = () => [
    "delete-use-license-certification",
  ]

  const addLicenseCertification = useMutation({
    mutationKey: postLicenseCertificationKey(),
    mutationFn: (data) => postLicenseCertification({ id, data }),
  })

  const editLicenseCertification = useMutation({
    mutationKey: patchLicenseCertificationKey(),
    mutationFn: (data) => patchLicenseCertification({ id, data }),
  })

  const deleteLic = useMutation({
    mutationKey: deleteLicenseCertificationKey(),
    mutationFn: (data) => deleteLicenseCertification({ id, data }),
    onSuccess: () => {
      router.push("/more/profile?edit=licenses")
    },
  })

  return { addLicenseCertification, editLicenseCertification, deleteLic }
}

export const useEducation = () => {
  const { id } = useDetails()
  const router = useRouter()

  const postEducationKey = () => ["add-education"]
  const patchEducationKey = () => ["edit-education"]
  const deleteEducationKey = () => ["delete-education"]

  const addEducation = useMutation({
    mutationKey: postEducationKey(),
    mutationFn: (data) => postEducation({ id, data }),
  })

  const editEducation = useMutation({
    mutationKey: patchEducationKey(),
    mutationFn: (data) => patchEducation({ id, data }),
  })

  const deleteEdu = useMutation({
    mutationKey: deleteEducationKey(),
    mutationFn: (data) => deleteEducation({ id, data }),
    onSuccess: () => {
      router.push("/more/profile?edit=education")
    },
  })

  return { addEducation, editEducation, deleteEdu }
}

const getFirstNameLastNameInitials = (firstName: string, lastName = "") => {
  if (!firstName) {
    return ""
  }
  const firstNameInitial = firstName[0].toUpperCase()
  return lastName
    ? `${firstNameInitial}${lastName[0].toUpperCase()}`
    : firstNameInitial
}

export const useAward = () => {
  const { id } = useDetails()
  const router = useRouter()

  const postAwardKey = () => ["add-award"]
  const patchAwardKey = () => ["edit-award"]
  const deleteAwardKey = () => ["delete-award"]

  const addAward = useMutation({
    mutationKey: postAwardKey(),
    mutationFn: (data) => postAward({ id, data }),
  })

  const editAward = useMutation({
    mutationKey: patchAwardKey(),
    mutationFn: (data) => patchAward({ id, data }),
  })

  const deleteAwa = useMutation({
    mutationKey: deleteAwardKey(),
    mutationFn: (data) => deleteAward({ id, data }),
    onSuccess: () => {
      router.push("/more/profile?edit=awards")
    },
  })

  return { addAward, editAward, deleteAwa }
}

export const useProfileAvatar = () => {
  const { id } = useDetails()
  const uploadProfileImgKey = () => ["upload-profile"]

  const uploadProfileImg = useMutation({
    mutationKey: uploadProfileImgKey(),
    mutationFn: (data) => postProfileImage({ id, data }),
  })

  return { uploadProfileImg }
}

export const useResume = () => {
  const { id } = useDetails()
  const uploadResumeKey = () => ["upload-resume"]
  const deleteResumeKey = () => ["delete-resume"]

  const uploadResume = useMutation({
    mutationKey: uploadResumeKey(),
    mutationFn: (data) => postResume({ id, data }),
  })

  const deleteResumeDtls = useMutation({
    mutationKey: deleteResumeKey(),
    mutationFn: () => deleteResume(id),
  })
  return { uploadResume, deleteResumeDtls }
}
