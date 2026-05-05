"use client"

import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PhoneIcon from "@mui/icons-material/Phone"
import {
    Box,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Tooltip
} from "@mui/material"

import { usePathname } from "next/navigation"

export type ResumeValues = {
    createdAt: string | number | Date
    resumeId: string | null | undefined
    templatNumber: string | null | undefined
    name: string
    email: string
    phone: string
    linkedin: string
    tenthSchool: string
    tenthPercentage: number | string
    interCollege: string
    interPercentage: number | string
    interType?: string
    degreeBranch?: string
    degreeType?: string
    customDegree?: string
    degreeCollege: string
    degreePercentage: number | string
    projects: { name: string; desc: string; tech: string }[]
    skills: string
    skillRatings: Record<string, number>
    certificateName: string
    certificateDesc: string
    achievement: string
    workExperience: { jobTitle: string; companyName: string; Location: string; startDate: string; endDate: string; responsibilities: string }[]
}

type Props = {
    values: ResumeValues
    height?: number | string
    width?: number | string
    submit?: boolean
}

const EMERALD = "#065f46"
const EMERALD_LIGHT = "#d1fae5"
const EMERALD_MID = "#059669"
const CHARCOAL = "#111827"
const WARM_WHITE = "#f9fafb"
const MUTED = "#6b7280"

const dummySkills = [
    "Skill - 1",
    "Skill - 2",
    "Skill - 3",
    "Skill - 4",
    "many more ..."
]

const dummyCertificate = {
    name: "Certificate name",
    desc: "Certificate description here"
}

const dummyExperience = {
    jobTitle: "Job Title",
    companyName: "Company Name",
    Location: "Location",
    startDate: "1900-01-01",
    endDate: "",
    responsibilities: "Your Responsibilites (key responsibilities)"
}

const dummyProjects = [
    {
        name: "Project 1 Title",
        desc: "Project 1 Description",
        tech: "Project 1 Tech Stacks"
    }
]

export default function TemplateTwo({ values, height, width, submit }: Props) {
    const path = usePathname()
    const isHistoryTab = path === "/history"

    const scale = width ? (typeof width === "number" ? width / 900 : 1) : 1

    const skillList = values.skills
        ? values.skills.split(",").map(s => s.trim()).filter(Boolean)
        : []

    const initials = values.name
        ? values.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "??"

    const skillsToShow = skillList.length > 0 ? skillList : dummySkills

    const workExp = values.workExperience || []
    const isExperienceEmpty =
        workExp.length === 0 ||
        values.workExperience.every(
            exp =>
                !exp.jobTitle &&
                !exp.companyName &&
                !exp.Location &&
                !exp.startDate &&
                !exp.endDate &&
                !exp.responsibilities
        )

    const experienceToRender =
        isExperienceEmpty && !isHistoryTab ? [dummyExperience] : values.workExperience

    const projects = values.projects || []
    const isProjectsEmpty =
        projects.length === 0 || projects.every(p => !p.name && !p.desc && !p.tech)

    const projectsToRender = isProjectsEmpty && !isHistoryTab ? dummyProjects : projects

    return (
        <Paper
            elevation={6}
            sx={{
                width: width || "100%",
                maxWidth: width || 900,
                minHeight: height || "2000px",
                mx: "auto",
                borderRadius: 2,
                bgcolor: WARM_WHITE,
                fontFamily: "'Georgia', serif",
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    bgcolor: EMERALD,
                    px: 4,
                    py: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <Box
                    sx={{
                        width: 72 * scale,
                        height: 72 * scale,
                        borderRadius: "12px",
                        bgcolor: "rgba(255,255,255,0.15)",
                        border: "2px solid rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 24 * scale,
                            fontWeight: 700,
                            color: "#fff",
                            letterSpacing: 2,
                            fontFamily: "inherit"
                        }}
                    >
                        {initials}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: `${2 * scale}rem`,
                            fontWeight: 700,
                            color: "#fff",
                            letterSpacing: 1,
                            lineHeight: 1.2,
                            fontFamily: "inherit"
                        }}
                    >
                        {values.name || "Your Name"}
                    </Typography>

                    <Stack direction="row" spacing={2.5} sx={{ mt: 1, flexWrap: "wrap" }}>
                        <ContactItem
                            icon={<PhoneIcon sx={{ fontSize: 13 * scale, color: EMERALD_LIGHT }} />}
                            text={values.phone ? `+91 ${values.phone}` : "+91 XXXXX XXXXX"}
                            scale={scale}
                        />
                        <ContactItem
                            icon={<EmailIcon sx={{ fontSize: 13 * scale, color: EMERALD_LIGHT }} />}
                            text={values.email || "your@email.com"}
                            scale={scale}
                        />
                        {(values.linkedin || !submit) && (
                            <ContactItem
                                icon={<LinkedInIcon sx={{ fontSize: 13 * scale, color: EMERALD_LIGHT }} />}
                                text={
                                    <a
                                        href={
                                            values.linkedin
                                                ? values.linkedin.startsWith("http")
                                                    ? values.linkedin
                                                    : `https://${values.linkedin}`
                                                : "https://linkedin.com/in/your-profile"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#a7f3d0", textDecoration: "none" }}
                                    >
                                        {values.linkedin || "linkedin.com/in/your-profile"}
                                    </a>
                                }
                                scale={scale}
                            />
                        )}
                    </Stack>
                </Box>
            </Box>

            <Grid
                container
                sx={{
                    minHeight: height || "100%",
                    minWidth: width ? 0 : 550,
                    flexWrap: "nowrap",
                    alignItems: "stretch"
                }}
            >
                <Grid
                    size={{ xs: 8.5 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                        bgcolor: WARM_WHITE
                    }}
                >
                    <Box sx={{ px: 3.5, py: 3, flex: 1 }}>
                        {(!isExperienceEmpty || !submit && !isHistoryTab) && (
                            <Box sx={{ mb: 2.5 }}>
                                <MainSection title="EXPERIENCE" emerald={EMERALD} scale={scale} />
                                {experienceToRender.map((eachExp, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            mb: 2.2,
                                            pl: 2,
                                            borderLeft: `3px solid ${EMERALD_LIGHT}`
                                        }}
                                    >
                                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }} spacing={0}>
                                            <Typography sx={{ fontSize: 13.5 * scale, fontWeight: 700, color: CHARCOAL }}>
                                                {eachExp.jobTitle}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 10.5 * scale,
                                                    color: MUTED,
                                                    fontStyle: "italic",
                                                    bgcolor: EMERALD_LIGHT,
                                                    px: 1,
                                                    py: 0.2,
                                                    borderRadius: 1,
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {eachExp.startDate
                                                    ? new Date(eachExp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                                                    : ""}{" "}
                                                -{" "}
                                                {eachExp.endDate
                                                    ? new Date(eachExp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                                                    : "Present"}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            sx={{
                                                fontSize: 12 * scale,
                                                fontWeight: 600,
                                                color: EMERALD_MID,
                                                mb: 0.5,
                                                mt: 0.3
                                            }}
                                        >
                                            {eachExp.companyName} | {eachExp.Location}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 11.5 * scale,
                                                color: MUTED,
                                                lineHeight: 1.7,
                                                whiteSpace: "pre-line"
                                            }}
                                        >
                                            {eachExp.responsibilities}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 1.8, borderColor: "#e5e7eb" }} />
                            </Box>
                        )}

                        {(!isProjectsEmpty || !submit && !isHistoryTab) && (
                            <Box sx={{ mb: 2.5 }}>
                                <MainSection title="PROJECTS" emerald={EMERALD} scale={scale} />
                                {projectsToRender.slice(0, 3).map((proj, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            mb: 2,
                                            p: 1.8,
                                            bgcolor: "#fff",
                                            border: `1px solid #e5e7eb`,
                                            borderTop: `3px solid ${EMERALD}`,
                                            borderRadius: "0 0 8px 8px"
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 13 * scale, fontWeight: 700, color: CHARCOAL, lineHeight: 1.4 }}>
                                            {proj.name || `Project ${index + 1} Title`}
                                        </Typography>
                                        <Typography sx={{ mt: 0.5, fontSize: 11.5 * scale, color: MUTED, lineHeight: 1.7 }}>
                                            {proj.desc || `Project ${index + 1} Description`}
                                        </Typography>
                                        <Typography sx={{ mt: 0.6, fontSize: 11.5 * scale, fontWeight: 600, color: EMERALD_MID }}>
                                            Tech Stack: {proj.tech || `Project ${index + 1} Tech Stacks`}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 1.8, borderColor: "#e5e7eb" }} />
                            </Box>
                        )}

                        <MainSection title="EDUCATION" emerald={EMERALD} scale={scale} />
                        <EduRow
                            degree={`${values.degreeType?.toLocaleUpperCase()} - ${values.degreeBranch || "Branch"}`}
                            college={values.degreeCollege || "Degree college name"}
                            year="2022 – 2026"
                            score={`Percentage: ${values.degreePercentage || " "}%`}
                            emerald={EMERALD}
                            emeraldMid={EMERALD_MID}
                            scale={scale}
                        />
                        <EduRow
                            degree={`${values.interType?.toLocaleUpperCase()}`}
                            college={values.interCollege || "Intermediate/Diploma college name"}
                            year="2020 – 2022"
                            score={`Percentage: ${values.interPercentage || " "}%`}
                            emerald={EMERALD}
                            emeraldMid={EMERALD_MID}
                            scale={scale}
                        />
                        <EduRow
                            degree="SECONDARY EDUCATION"
                            college={values.tenthSchool || "10th school name"}
                            year="2019 – 2020"
                            score={`Percentage: ${values.tenthPercentage || " "}%`}
                            emerald={EMERALD}
                            emeraldMid={EMERALD_MID}
                            scale={scale}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e5e7eb" }} />

                        {(values.achievement !== "" || !submit && !isHistoryTab) && (
                            <Box>
                                <MainSection title="ACHIEVEMENT" emerald={EMERALD} scale={scale} />
                                <Stack direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            mt: "7px",
                                            width: 6,
                                            height: 6,
                                            borderRadius: "2px",
                                            bgcolor: EMERALD,
                                            flexShrink: 0
                                        }}
                                    />
                                    <Typography sx={{ fontSize: 12 * scale, color: MUTED, lineHeight: 1.8 }}>
                                        {values.achievement || "Any achievements in your life"}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Grid>

                <Grid
                    size={{ xs: 4.5 }}
                    sx={{
                        bgcolor: EMERALD_LIGHT,
                        display: "flex",
                        flexDirection: "column",
                        p: 0
                    }}
                >
                    <Box sx={{ px: 2.5, pt: 3, pb: 1.5 }}>
                        <SidebarSection title="SKILLS" emerald={EMERALD} scale={scale} />
                        <Stack spacing={0.9} sx={{ mt: 1.2 }}>
                            {skillsToShow.map((skill, i) => {
                                const trimmedSkill = skill.trim()
                                const rating = values.skillRatings?.[trimmedSkill] ?? 0
                                return (
                                    <Box key={i}>
                                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 0.3 }}>
                                            <Stack direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: "2px",
                                                        bgcolor: EMERALD,
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: 11.5 * scale, color: CHARCOAL, fontWeight: 600 }}>
                                                    {trimmedSkill}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Tooltip title={`Rating: ${rating}/10`} arrow>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: 5 * scale,
                                                    bgcolor: "#a7f3d0",
                                                    borderRadius: 3,
                                                    overflow: "hidden",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: `${rating * 10}%`,
                                                        height: "100%",
                                                        bgcolor: EMERALD,
                                                        transition: "width 0.3s ease"
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                )
                            })}
                        </Stack>
                    </Box>

                    <Divider sx={{ mx: 2.5, my: 1.8, borderColor: "#6ee7b7" }} />

                    {((values.certificateName !== "" || values.certificateDesc !== "") || !submit && !isHistoryTab) && (
                        <Box sx={{ px: 2.5, pb: 2 }}>
                            <SidebarSection title="CERTIFICATE" emerald={EMERALD} scale={scale} />
                            <Box
                                sx={{
                                    mt: 1,
                                    p: 1.5,
                                    bgcolor: "#fff",
                                    borderRadius: 1.5,
                                    borderLeft: `3px solid ${EMERALD}`
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 12 * scale,
                                        fontWeight: 700,
                                        color: values.certificateName ? CHARCOAL : "#94a3b8",
                                        lineHeight: 1.6
                                    }}
                                >
                                    {values.certificateName || dummyCertificate.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        mt: 0.4,
                                        fontSize: 11 * scale,
                                        color: values.certificateDesc ? MUTED : "#94a3b8",
                                        lineHeight: 1.7
                                    }}
                                >
                                    {values.certificateDesc || dummyCertificate.desc}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}

function SidebarSection({ title, emerald, scale }: { title: string; emerald: string; scale: number }) {
    return (
        <Typography
            sx={{
                fontSize: 11.5 * scale,
                fontWeight: 700,
                color: emerald,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                mb: 0.6,
                pb: 0.4,
                borderBottom: `2px solid ${emerald}`
            }}
        >
            {title}
        </Typography>
    )
}

function MainSection({ title, emerald, scale }: { title: string; emerald: string; scale: number }) {
    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
            <Box sx={{ width: 4, height: 18 * scale, bgcolor: emerald, borderRadius: 1, flexShrink: 0 }} />
            <Typography
                sx={{
                    fontSize: 13.5 * scale,
                    fontWeight: 700,
                    color: emerald,
                    letterSpacing: 1.5,
                    textTransform: "uppercase"
                }}
            >
                {title}
            </Typography>
        </Stack>
    )
}

function ContactItem({ icon, text, scale }: { icon: React.ReactNode; text: React.ReactNode; scale: number }) {
    return (
        <Stack direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
            {icon}
            <Typography sx={{ fontSize: 11 * scale, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, wordBreak: "break-all" }}>
                {text}
            </Typography>
        </Stack>
    )
}

function EduRow({
    degree,
    college,
    year,
    score,
    emerald,
    emeraldMid,
    scale
}: {
    degree: string
    college: string
    year: string
    score: string
    emerald: string
    emeraldMid: string
    scale: number
}) {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 1.6 }}>
            <Box sx={{ minWidth: 90 * scale, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 11 * scale, color: "#9ca3af", fontStyle: "italic", lineHeight: 1.6 }}>
                    {year}
                </Typography>
                <Typography sx={{ fontSize: 11.5 * scale, fontWeight: 700, color: emeraldMid }}>
                    {score}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ fontSize: 13 * scale, fontWeight: 700, color: CHARCOAL, lineHeight: 1.5 }}>
                    {degree}
                </Typography>
                <Typography sx={{ fontSize: 12 * scale, color: MUTED, lineHeight: 1.7 }}>
                    {college}
                </Typography>
            </Box>
        </Stack>
    )
}