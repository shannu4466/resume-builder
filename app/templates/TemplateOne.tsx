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

const TEAL = "#0097a7"
const DARK = "#1a2332"
const SIDEBAR_BG = "#f0f7f8"

const dummySkills = [
    "Skill - 1",
    "Skill - 2",
    "Skill - 3",
    "Skill - 4",
    "many more ..."
];

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

export default function TemplateOne({ values, height, width, submit }: Props) {
    const path = usePathname()
    const isHistoryTab = (path === "/history")

    const scale = width ? (typeof width === 'number' ? width / 900 : 1) : 1;

    const skillList = values.skills
        ? values.skills.split(",").map(s => s.trim()).filter(Boolean)
        : []

    const initials = values.name
        ? values.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "??"

    const skillsToShow = skillList && skillList.length > 0 ? skillList : dummySkills;

    const workExp = values.workExperience || [];
    const isExperienceEmpty = workExp.length === 0 || values.workExperience.every(exp =>
        !exp.jobTitle &&
        !exp.companyName &&
        !exp.Location &&
        !exp.startDate &&
        !exp.endDate &&
        !exp.responsibilities
    )

    const experienceToRender = (isExperienceEmpty && !isHistoryTab)
        ? [dummyExperience]
        : values.workExperience

    const projects = values.projects || [];
    const isProjectsEmpty =
        projects.length === 0 ||
        projects.every(p =>
            !p.name &&
            !p.desc &&
            !p.tech
        )
    const projectsToRender = (isProjectsEmpty && !isHistoryTab) ? dummyProjects : projects;

    return (
        <Paper
            elevation={6}
            sx={{
                width: width || "100%",
                maxWidth: width || 900,
                minHeight: height || "2000px",
                mx: "auto",
                borderRadius: 2,
                bgcolor: "#fff",
                fontFamily: "'Georgia', serif",
            }}
        >
            <Grid container sx={{
                minHeight: height || "100%",
                minWidth: width ? 0 : 550,
                flexWrap: "nowrap",
                alignItems: "stretch",
            }}>
                {/* LEFT SIDEBAR */}
                <Grid
                    size={{ xs: 4.5 }}
                    sx={{
                        bgcolor: SIDEBAR_BG,
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                    }}
                >
                    {/* Avatar / Initials */}
                    <Box
                        sx={{
                            bgcolor: TEAL,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 3.5,
                            px: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 90 * scale,
                                height: 90 * scale,
                                borderRadius: "50%",
                                border: "3px solid #fff",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                                bgcolor: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 26 * scale,
                                    fontWeight: 700,
                                    color: "#fff",
                                    letterSpacing: 2,
                                    fontFamily: "inherit",
                                }}
                            >
                                {initials}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Contact */}
                    <Box sx={{ px: 2.2, pt: 2.5, pb: 1 }}>
                        <SidebarSection title="CONTACT" teal={TEAL} scale={scale} />
                        <ContactRow
                            icon={<PhoneIcon sx={{ fontSize: 14 * scale, color: TEAL }} />}
                            text={values.phone ? `+91 ${values.phone}` : "+91 XXXXX XXXXX"}
                            scale={scale}
                        />
                        <ContactRow
                            icon={<EmailIcon sx={{ fontSize: 14 * scale, color: TEAL }} />}
                            text={values.email || "your@email.com"}
                            scale={scale}
                        />
                        {(values.linkedin || !submit) && (
                            <ContactRow
                                icon={<LinkedInIcon sx={{ fontSize: 14 * scale, color: TEAL }} />}
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
                                        style={{ color: "#0a66c2", textDecoration: "none" }}
                                    >
                                        {values.linkedin || "linkedin.com/in/your-profile"}
                                    </a>
                                }
                                scale={scale}
                            />
                        )}
                    </Box>

                    <Divider sx={{ mx: 2, my: 1.5, borderColor: "#cde3e6" }} />

                    {/* Skills */}
                    <Box sx={{ px: 2.2, pb: 1 }}>
                        <SidebarSection title="SKILLS" teal={TEAL} scale={scale} />
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {skillsToShow.map((skill, i) => {
                                const trimmedSkill = skill.trim();
                                const rating = values.skillRatings?.[trimmedSkill] ?? 0;
                                return (
                                    <Stack key={i} direction="row" sx={{ alignItems: "center" }} spacing={0.8}>
                                        <Box
                                            sx={{
                                                mt: "6px",
                                                width: 5,
                                                height: 5,
                                                borderRadius: "50%",
                                                bgcolor: TEAL,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: 11.5 * scale,
                                                color: "#334155",
                                                lineHeight: 1.8,
                                                minWidth: 80 * scale,
                                            }}
                                        >
                                            {trimmedSkill}
                                        </Typography>
                                        {/* Line Rating Bar with Hover */}
                                        <Tooltip title={`Rating: ${rating}/10`} arrow>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: 100 * scale,
                                                    height: 6 * scale,
                                                    bgcolor: "#cbd5e1",
                                                    borderRadius: 5,
                                                    overflow: "hidden",
                                                    cursor: "pointer",
                                                    mt: "4px",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: `${rating * 10}%`,
                                                        height: "100%",
                                                        bgcolor: TEAL,
                                                        transition: "width 0.3s ease",
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Box>

                    <Divider sx={{ mx: 2, my: 1.5, borderColor: "#cde3e6" }} />

                    {/* Certificate */}
                    {((values.certificateName !== "" || values.certificateDesc !== "") || !submit && !isHistoryTab) && (
                        <Box sx={{ px: 2.2, pb: 2 }}>
                            <SidebarSection title="CERTIFICATE" teal={TEAL} scale={scale} />
                            <Typography
                                sx={{
                                    mt: 1,
                                    fontSize: 12.5 * scale,
                                    fontWeight: 700,
                                    color: values.certificateName ? "#1a2332" : "#94a3b8",
                                    lineHeight: 1.7,
                                }}
                            >
                                {values.certificateName || dummyCertificate.name}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.5,
                                    fontSize: 11.5 * scale,
                                    color: values.certificateDesc ? "#64748b" : "#94a3b8",
                                    lineHeight: 1.8,
                                }}
                            >
                                {values.certificateDesc || dummyCertificate.desc}
                            </Typography>
                        </Box>
                    )}
                </Grid>

                {/* RIGHT MAIN */}
                <Grid
                    size={{ xs: 8.5 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                        minHeight: height || 600,
                        minWidth: width ? 0 : 550,
                        flexWrap: "nowrap",
                    }}
                >
                    {/* Header */}
                    <Box sx={{ bgcolor: DARK, px: 2, py: 3.5, height: "96px" }}>
                        <Typography
                            sx={{
                                fontSize: `${1.9 * scale}rem`,
                                fontWeight: 600,
                                color: TEAL,
                                fontFamily: "'Georgia', serif",
                                letterSpacing: 0.5,
                                lineHeight: 1.53,
                            }}
                        >
                            {values.name || "Your Name"}
                        </Typography>
                    </Box>

                    {/* Body */}
                    <Box sx={{ px: 3.5, py: 2.5, flex: 1 }}>
                        {/* Experience */}
                        {(!isExperienceEmpty || !submit && !isHistoryTab) && (
                            <Box>
                                <MainSection title="EXPERIENCE" teal={TEAL} scale={scale} />
                                {experienceToRender.map((eachExp, index) => (
                                    <Box sx={{ mb: 2.5 }} key={index}>
                                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <Typography sx={{ fontSize: 14 * scale, fontWeight: 700, color: DARK }}>
                                                {eachExp.jobTitle}
                                            </Typography>
                                            <Typography sx={{ fontSize: 11 * scale, color: "#64748b", fontStyle: "italic" }}>
                                                {eachExp.startDate ? new Date(eachExp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ""} -
                                                {eachExp.endDate ? new Date(eachExp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : " Present"}
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ fontSize: 12.5 * scale, fontWeight: 600, color: TEAL, mb: 0.5 }}>
                                            {eachExp.companyName} | {eachExp.Location}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 * scale, color: "#475569", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                                            {eachExp.responsibilities}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />
                            </Box>
                        )}

                        {/* Projects */}
                        {(!isProjectsEmpty || !submit && !isHistoryTab) && (
                            <Box>
                                <MainSection title="PROJECTS" teal={TEAL} scale={scale} />
                                {projectsToRender.slice(0, 3).map((proj, index) => (
                                    <ProjectCard
                                        key={index}
                                        name={proj.name || `Project ${index + 1} Title`}
                                        desc={proj.desc || `Project ${index + 1} Description`}
                                        tech={proj.tech || `Project ${index + 1} Tech Stacks`}
                                        teal={TEAL}
                                        dark={DARK}
                                        scale={scale}
                                    />
                                ))}

                                <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />
                            </Box>
                        )}

                        {/* Education */}
                        <MainSection title="EDUCATION" teal={TEAL} scale={scale} />
                        <EduRow
                            degree={`${values.degreeType?.toLocaleUpperCase()} - ${values.degreeBranch || "Branch"}`}
                            college={values.degreeCollege || "Degree college name"}
                            year="2022 – 2026"
                            score={`Percentage: ${values.degreePercentage || " "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />
                        <EduRow
                            degree={`${values.interType?.toLocaleUpperCase()}`}
                            college={values.interCollege || "Intermediate/Diploma college name"}
                            year="2020 – 2022"
                            score={`Percentage: ${values.interPercentage || " "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />
                        <EduRow
                            degree="SECONDARY EDUCATION"
                            college={values.tenthSchool || "10th school name"}
                            year="2019 – 2020"
                            score={`Percentage: ${values.tenthPercentage || " "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Achievement */}
                        {(values.achievement !== "" || !submit && !isHistoryTab) && (
                            <Box>
                                <MainSection title="ACHIEVEMENT" teal={TEAL} scale={scale} />
                                <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                                    <Box
                                        sx={{
                                            mt: "7px",
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            bgcolor: "#94a3b8",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography sx={{ fontSize: 12 * scale, color: "#475569", lineHeight: 1.8 }}>
                                        {values.achievement || "Any achivements in your life"}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

function SidebarSection({ title, teal, scale }: { title: string; teal: string; scale: number }) {
    return (
        <Typography
            sx={{
                fontSize: 12 * scale,
                fontWeight: 700,
                color: teal,
                letterSpacing: 1,
                textTransform: "uppercase",
                mb: 0.8,
                borderBottom: `2px solid ${teal}`,
                pb: 0.4,
            }}
        >
            {title}
        </Typography>
    )
}

function MainSection({ title, teal, scale }: { title: string; teal: string; scale: number }) {
    return (
        <Typography
            sx={{
                fontSize: 14 * scale,
                fontWeight: 700,
                color: teal,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mb: 1.4,
                borderBottom: `2px solid ${teal}`,
                pb: 0.5,
            }}
        >
            {title}
        </Typography>
    )
}

function ContactRow({ icon, text, scale }: { icon: React.ReactNode; text: React.ReactNode; scale: number }) {
    return (
        <Stack direction="row" spacing={0.8} sx={{ alignItems: "flex-start", mb: 0.9 }}>
            <Box sx={{ flexShrink: 0, pt: "1px" }}>{icon}</Box>
            <Typography sx={{ fontSize: 11.5 * scale, color: "#334155", lineHeight: 1.7, wordBreak: "break-all" }}>
                {text}
            </Typography>
        </Stack>
    )
}

function ProjectCard({
    name,
    desc,
    tech,
    teal,
    dark,
    scale,
}: {
    name: string
    desc: string
    tech: string
    teal: string
    dark: string
    scale: number
}) {
    return (
        <Box sx={{ mb: 1.8 }}>
            <Typography sx={{ fontSize: 13.5 * scale, fontWeight: 700, color: dark, lineHeight: 1.5 }}>
                {name}
            </Typography>
            <Typography sx={{ mt: 0.4, fontSize: 12 * scale, color: "#475569", lineHeight: 1.8 }}>
                {desc}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 12 * scale, fontWeight: 600, color: teal }}>
                Tech Stack: {tech}
            </Typography>
        </Box>
    )
}

function EduRow({
    degree,
    college,
    year,
    score,
    teal,
    dark,
    accent,
    scale,
}: {
    degree: string
    college: string
    year: string
    score: string
    teal: string
    dark: string
    accent: string
    scale: number
}) {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 1.6 }}>
            <Box sx={{ minWidth: 90 * scale, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 11 * scale, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6 }}>
                    {year}
                </Typography>
                <Typography sx={{ fontSize: 11.5 * scale, fontWeight: 700, color: accent }}>
                    {score}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ fontSize: 13 * scale, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.5 }}>
                    {degree}
                </Typography>
                <Typography sx={{ fontSize: 12 * scale, color: "#475569", lineHeight: 1.7 }}>
                    {college}
                </Typography>
            </Box>
        </Stack>
    )
}