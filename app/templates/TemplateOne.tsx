import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PhoneIcon from "@mui/icons-material/Phone"
import {
    Box,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material"

type ResumeValues = {
    name: string
    email: string
    phone: string
    linkedin: string
    tenthSchool: string
    tenthPercentage: number | string
    interCollege: string
    interPercentage: number | string
    degreeCollege: string
    degreePercentage: number | string
    project1Name: string
    project1Desc: string
    project1Tech: string
    project2Name: string
    project2Desc: string
    project2Tech: string
    skills: string
    certificateName: string
    certificateDesc: string
    achievement: string
    jobTitle?: string
    companyName?: string
    Location?: string
    startDate?: Date | string | number
    endDate?: Date | string | number
    responsibilities?: string
}

type Props = {
    values: ResumeValues
    height?: number | string
    width?: number | string
}

const TEAL = "#0097a7"
const DARK = "#1a2332"
const SIDEBAR_BG = "#f0f7f8"

const dummySkills = [
    "Skill - 1",
    "Skill - 2",
    "Skill - 3",
    "Skill - 4",
    "So on ..."
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


export default function TemplateOne({ values, height, width }: Props) {
    const scale = width ? (typeof width === 'number' ? width / 900 : 1) : 1;

    const skillList = values.skills
        ? values.skills.split(",").map(s => s.trim()).filter(Boolean)
        : []

    const initials = values.name
        ? values.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "??"

    const skillsToShow = skillList && skillList.length > 0 ? skillList : dummySkills;

    const exp = values.jobTitle ? values : dummyExperience;

    return (
        <Paper
            elevation={6}
            sx={{
                width: width || "100%",
                maxWidth: width || 900,
                height: height || "auto",
                mx: "auto",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#fff",
                fontFamily: "'Georgia', serif",
            }}
        >
            <Grid container sx={{ minHeight: height || 600, minWidth: width ? 0 : 550, flexWrap: "nowrap" }}>
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
                    </Box>

                    <Divider sx={{ mx: 2, my: 1.5, borderColor: "#cde3e6" }} />

                    {/* Skills */}
                    <Box sx={{ px: 2.2, pb: 1 }}>
                        <SidebarSection title="SKILLS" teal={TEAL} scale={scale} />
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {skillsToShow.map((skill, i) => (
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
                                    <Typography sx={{ fontSize: 11.5 * scale, color: "#334155", lineHeight: 1.8 }}>
                                        {skill}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    <Divider sx={{ mx: 2, my: 1.5, borderColor: "#cde3e6" }} />

                    {/* Certificate */}
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
                </Grid>

                {/* RIGHT MAIN */}
                <Grid
                    size={{ xs: 8.5 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                    }}
                >
                    {/* Header */}
                    <Box sx={{ bgcolor: DARK, px: 2, py: 3.5, height: "96px" }}>
                        <Typography
                            sx={{
                                fontSize: `${2.1 * scale}rem`,
                                fontWeight: 700,
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
                        <MainSection title="EXPERIENCE" teal={TEAL} scale={scale} />
                        <Box sx={{ mb: 2.5 }}>
                            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Typography sx={{ fontSize: 14 * scale, fontWeight: 700, color: DARK }}>
                                    {exp.jobTitle}
                                </Typography>
                                <Typography sx={{ fontSize: 11 * scale, color: "#64748b", fontStyle: "italic" }}>
                                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ""} -
                                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : " Present"}
                                </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 12.5 * scale, fontWeight: 600, color: TEAL, mb: 0.5 }}>
                                {exp.companyName} | {exp.Location}
                            </Typography>
                            <Typography sx={{ fontSize: 12 * scale, color: "#475569", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                                {exp.responsibilities}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Projects */}
                        <MainSection title="PROJECTS" teal={TEAL} scale={scale} />
                        <ProjectCard
                            name={values.project1Name || "Project 1 Title"}
                            desc={values.project1Desc || "Project 1 Description"}
                            tech={values.project1Tech || "Project 1 Tech Stacks"}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />
                        <ProjectCard
                            name={values.project2Name || "Project 2 Title"}
                            desc={values.project2Desc || "Project 2 Description"}
                            tech={values.project2Tech || "Project 2 Tech Stacks"}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Education */}
                        <MainSection title="EDUCATION" teal={TEAL} scale={scale} />
                        <EduRow
                            degree="B.Tech – CSE"
                            college={values.degreeCollege || "Degree college name"}
                            year="2022 – 2026"
                            score={`${values.degreePercentage || "Percentage "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />
                        <EduRow
                            degree="Intermediate"
                            college={values.interCollege || "Intermediate/Diploma college name"}
                            year="2020 – 2022"
                            score={`${values.interPercentage || "Percentage "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />
                        <EduRow
                            degree="Secondary Education"
                            college={values.tenthSchool || "10th school name"}
                            year="2019 – 2020"
                            score={`${values.tenthPercentage || "Percentage "}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale} accent={""}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Achievement */}
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