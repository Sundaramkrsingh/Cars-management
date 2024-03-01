import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { ChangeEvent, useRef, useState } from "react"
import { EditVariants } from "../type"
import EditWrapperCard from "./edit-wrapper-card"
import { Options } from "nuqs"

type CommonCardProps = {
  onClick: (card: EditVariants) => void
  setEdit?: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
}

export const Profile = ({ onClick }: CommonCardProps) => {
  const profileSectionConfig = {
    avatar: { initials: "MG", bgColor: "#F8F98F", src: null },
    name: "Maria George",
    description:
      "Product Designer | Global profile of 300 + clients | Bridging Business Goals with Exceptional User Experiences | AI/M practitioner",
    email: "@mariageorgebezt",
  }

  const { avatar, email, description, name } = profileSectionConfig

  return (
    <EditWrapperCard
      onClick={() => onClick("profile")}
      heading={
        <div
          className={cn(
            "relative h-[60px] w-[60px] flex items-center rounded-full justify-center overflow-hidden",
            avatar?.initials && `bg-pastel-yellow`
          )}
        >
          {avatar?.src ? (
            <Image src={avatar?.src} alt="profile-img" layout="fill" />
          ) : (
            <p className="text-[23px] font-semibold text-skobeloff">
              {avatar.initials}
            </p>
          )}
        </div>
      }
    >
      <p className="font-medium text-[22px] mb-1">{name}</p>
      <p className="text-smoky-black mb-9">{description}</p>
      <p className="text-granite-gray text-sm">{email}</p>
    </EditWrapperCard>
  )
}

export const WorkExperience = ({ onClick, setEdit }: CommonCardProps) => {
  const workExConfig: any = {
    profileCompletion: "6%",
    workExp: [
      // {
      //   designation: "Product Designer",
      //   company: "UST Global ",
      //   experience: {
      //     duration: "2 years, 3 months",
      //     timePeriod: "Aug 2022 - Present",
      //   },
      // },
      // {
      //   designation: "Visual Design Intern",
      //   company: "Google Pay",
      //   experience: {
      //     duration: "1 months",
      //     timePeriod: "Dec 2022 - Jan 2023",
      //   },
      // },
    ],
  }

  const isEmpty = workExConfig.workExp.length === 0

  return (
    <EditWrapperCard
      onClick={() => {
        isEmpty
          ? onClick("add-experience")
          : setEdit && setEdit("work-experience ")
      }}
      heading="Work Experience"
      endowment={
        isEmpty ? (
          <div className="bg-azureish-white px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${workExConfig?.profileCompletion} profile`}
          </div>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        workExConfig?.workExp?.map(
          ({ company, designation, experience }: any, idx: number) => {
            return (
              <React.Fragment key={`${company}_${idx}`}>
                <p className="text-smoky-black font-medium">{designation}</p>
                <p className="text-eerie-black text-sm font-medium">
                  {company}
                </p>
                <div className="flex gap-2 items-center text-sm mt-1">
                  <p className="text-eerie-black">{experience.timePeriod}</p>
                  <div className="w-1 h-1 rounded-full bg-eerie-black" />
                  <p className="text-eerie-black">{experience.duration}</p>
                </div>
                {idx !== workExConfig.length - 1 && (
                  <hr className="border-platinum my-4" />
                )}
              </React.Fragment>
            )
          }
        )
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer "
            onClick={() => setEdit && setEdit("add-experience")}
          />
          <p className="text-skobeloff font-medium">Add work experience</p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Projects = ({ onClick }: CommonCardProps) => {
  const projectsConfig = [
    {
      project: "Salesmate- Advanced CRM Platform",
      contributions: [
        "B2B CRM product targeted for sales team to increase overall performance",
        "Increased team sales by 37%",
      ],
      projectLink: "#",
    },

    {
      project: "Air Bnb seller rooms feature",
      contributions: [
        "Ideated on concepts to integrate AI for easing seller room creation",
        "Decreased user dropout rate by 12 which lead to increase in avg number of seller profiles created",
      ],
      projectLink: "#",
    },
  ]
  return (
    <EditWrapperCard onClick={() => onClick("projects")} heading="Projects">
      {projectsConfig.map(({ project, projectLink, contributions }, idx) => {
        return (
          <React.Fragment key={idx}>
            <p className="text-smoky-black font-medium mb-1">{project}</p>
            {contributions.map((contribution, idx) => (
              <p
                className="text-eerie-black text-sm"
                key={`${contribution}-${idx}`}
              >
                - {contribution}
              </p>
            ))}
            <Link
              href={projectLink}
              className="flex gap-2 items-center text-skobeloff font-semibold mt-1"
            >
              <p className=""> Link to credential</p>
              <Icons.rightArrow className="w-4 h-4" />
            </Link>
            {idx !== projectsConfig.length - 1 && (
              <hr className="border-platinum my-4" />
            )}
          </React.Fragment>
        )
      })}
    </EditWrapperCard>
  )
}

export const Licenses = ({ onClick }: CommonCardProps) => {
  const licensesConfig = [
    {
      companyImage: "/kaggle.svg",
      certification: "Microsoft level 1 UX certification",
      issuer: "Microsoft inc",
      issued: "Aug 2022",
      expires: "Aug 2023",
      certificationLink: "#",
    },

    {
      companyImage: "/course.svg",
      certification: "Google user flows course",
      issuer: "Coursera",
      issued: "Aug 2022",
      expires: "Aug 2027",
      certificationLink: "#",
    },
  ]

  return (
    <EditWrapperCard
      onClick={() => onClick("licenses")}
      heading="Licenses & certifications"
    >
      {licensesConfig.map(
        (
          {
            certification,
            issued,
            expires,
            certificationLink,
            issuer,
            companyImage,
          },
          idx
        ) => {
          return (
            <div key={idx} className="flex items-start gap-3">
              <Image
                src={companyImage}
                alt="company-img"
                width={40}
                height={40}
              />

              <div>
                <p className="text-smoky-black font-medium">{certification}</p>
                <p className="text-eerie-black text-sm">{issuer}</p>
                <div className="flex gap-2 items-center text-sm mt-1">
                  <p className="text-dark-liver">Issued {issued}</p>
                  <div className="w-1 h-1 rounded-full bg-eerie-black" />
                  <p className="text-dark-liver">Expires {expires}</p>
                </div>
                <Link
                  href={certificationLink}
                  className="flex gap-2 items-center text-skobeloff font-semibold"
                >
                  <p className=""> Link to credential</p>
                  <Icons.rightArrow className="w-4 h-4" />
                </Link>
                {idx !== licensesConfig.length - 1 && (
                  <hr className="border-platinum my-4" />
                )}
              </div>
            </div>
          )
        }
      )}
    </EditWrapperCard>
  )
}

export const Education = ({ onClick }: CommonCardProps) => {
  const educationConfig = [
    {
      college: "IIT , Roorkee",
      course: "M tech, Web Design and Development",
      duration: "2022 - 2024",
    },
    {
      college: "SRM University",
      course: "B tech, Computer Science",
      duration: "2018 - 2022",
    },
  ]

  return (
    <EditWrapperCard onClick={() => onClick("education")} heading="Education">
      {educationConfig.map(({ college, course, duration }, idx) => {
        return (
          <React.Fragment key={`${college}_${idx}`}>
            <p className="text-smoky-black font-medium">{college}</p>
            <p className="text-eerie-black text-sm">{course}</p>

            <p className="text-eerie-black text-sm mt-1">{duration}</p>
            {idx !== educationConfig.length - 1 && (
              <hr className="border-platinum my-4" />
            )}
          </React.Fragment>
        )
      })}
    </EditWrapperCard>
  )
}

export const Awards = ({ onClick }: CommonCardProps) => {
  const awardsConfig = [
    {
      award: "All India Hackathon 2nd prize",
      description:
        "2nd prize for automated attendence taker product for all India level hackathon",
      awardLink: "#",
    },

    {
      award: "Top 100  product design challenger",
      description:
        "Best product design challenger for DesignUp challenge with around 3 lacks participants from all over the world",
      awardLink: "#",
    },
  ]
  return (
    <EditWrapperCard
      onClick={() => onClick("awards")}
      heading="Awards and achievements"
    >
      {awardsConfig.map(({ award, awardLink, description }, idx) => {
        return (
          <React.Fragment key={idx}>
            <p className="text-smoky-black font-medium">{award}</p>
            <p className="text-eerie-black text-sm">{description}</p>
            <Link
              href={awardLink}
              className="flex gap-2 items-center text-skobeloff font-semibold mt-1"
            >
              <p className=""> Link to credential</p>
              <Icons.rightArrow className="w-4 h-4" />
            </Link>
            {idx !== awardsConfig.length - 1 && (
              <hr className="border-platinum my-4" />
            )}
          </React.Fragment>
        )
      })}
    </EditWrapperCard>
  )
}

export const Resume = () => {
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    ;(fileInputRef?.current as HTMLInputElement | null)?.click()
  }

  return (
    <EditWrapperCard heading="Resume">
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        className="h-20 border-dashed border border-philippine-silver rounded-xl p-5"
        onClick={handleButtonClick}
      >
        <div className="flex justify-between items-center h-full">
          <div className="text-left">
            <p className="font-medium text-smoky-black">Upload your resume</p>
            <p className="text-dark-charcoal font-medium text-sm">
              File format: PDF, Doc
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl text-white bg-celadon-green flex items-center justify-center">
            <Icons.upload />
          </div>
        </div>
      </button>
    </EditWrapperCard>
  )
}
export const BasicInformation = ({ onClick }: CommonCardProps) => {
  const basicInfoConfig = {
    email: "maria@gmail.com",
    phoneNo: "731822446",
    dob: "15 September 2024",
    address:
      "Habibullah Rd, Satyamurthy Nagar, T. Nagar, Chennai, Tamil Nadu 600017",
  }

  const { address, dob, email, phoneNo } = basicInfoConfig

  return (
    <EditWrapperCard
      onClick={() => onClick("basic-information")}
      heading="Basic Information"
    >
      <div className="mb-4">
        <p className="text-dark-charcoal text-sm">Email</p>
        <p className="text-smoky-black font-medium">{email}</p>
      </div>
      <div className="mb-4">
        <p className="text-dark-charcoal text-sm">Date of birth</p>
        <p className="text-smoky-black font-medium">{dob}</p>
      </div>
      <div className="mb-4">
        <p className="text-dark-charcoal text-sm">Phone number</p>
        <p className="text-smoky-black font-medium">{phoneNo}</p>
      </div>
      <div>
        <p className="text-dark-charcoal text-sm">Address</p>
        <p className="text-smoky-black font-medium">{address}</p>
      </div>
    </EditWrapperCard>
  )
}
