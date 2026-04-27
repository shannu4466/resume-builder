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
}

type Props = {
    values: ResumeValues
    height?: number | string
    width?: number | string
}

const TEAL = "#0097a7"
const DARK = "#1a2332"
const SIDEBAR_BG = "#f0f7f8"

export default function TemplateTwo({ values, height, width }: Props) {
    const scale = width ? (typeof width === 'number' ? width / 900 : 1) : 1;

    const skillList = values.skills
        ? values.skills.split(",").map(s => s.trim()).filter(Boolean)
        : []

    const initials = values.name
        ? values.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "YN"

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
                    size={{ xs: 3.5 }}
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
                            text={`+91 ${values.phone}`}
                            scale={scale}
                        />
                        <ContactRow
                            icon={<EmailIcon sx={{ fontSize: 14 * scale, color: TEAL }} />}
                            text={values.email}
                            scale={scale}
                        />
                        <ContactRow
                            icon={<LinkedInIcon sx={{ fontSize: 14 * scale, color: TEAL }} />}
                            text={values.linkedin}
                            scale={scale}
                        />
                    </Box>

                    <Divider sx={{ mx: 2, my: 1.5, borderColor: "#cde3e6" }} />

                    {/* Skills */}
                    <Box sx={{ px: 2.2, pb: 1 }}>
                        <SidebarSection title="SKILLS" teal={TEAL} scale={scale} />
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {skillList.map((skill, i) => (
                                <Stack key={i} direction="row" sx={{ alignItems: "flex-start" }} spacing={0.8}>
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
                                color: "#1a2332",
                                lineHeight: 1.7,
                            }}
                        >
                            {values.certificateName}
                        </Typography>
                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 11.5 * scale,
                                color: "#64748b",
                                lineHeight: 1.8,
                            }}
                        >
                            {values.certificateDesc}
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
                    <Box sx={{ bgcolor: DARK, px: 3.5, py: 3 }}>
                        <Typography
                            sx={{
                                fontSize: `${2.1 * scale}rem`,
                                fontWeight: 700,
                                color: TEAL,
                                fontFamily: "'Georgia', serif",
                                letterSpacing: 0.5,
                                lineHeight: 1.15,
                            }}
                        >
                            {values.name || "Your Name"}
                        </Typography>
                    </Box>

                    {/* Body */}
                    <Box sx={{ px: 3.5, py: 2.5, flex: 1 }}>

                        {/* Projects */}
                        <MainSection title="PROJECTS" teal={TEAL} scale={scale} />

                        <ProjectCard
                            name={values.project1Name}
                            desc={values.project1Desc}
                            tech={values.project1Tech}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />
                        <ProjectCard
                            name={values.project2Name}
                            desc={values.project2Desc}
                            tech={values.project2Tech}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Education */}
                        <MainSection title="EDUCATION" teal={TEAL} scale={scale} />

                        <EduRow
                            degree="B.Tech – CSE"
                            college={values.degreeCollege}
                            year="2022 – 2026"
                            score={`${values.degreePercentage}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />
                        <EduRow
                            degree="Intermediate"
                            college={values.interCollege}
                            year="2020 – 2022"
                            score={`${values.interPercentage}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />
                        <EduRow
                            degree="Secondary Education"
                            college={values.tenthSchool}
                            year="2019 – 2020"
                            score={`${values.tenthPercentage}%`}
                            teal={TEAL}
                            dark={DARK}
                            scale={scale}
                        />

                        <Divider sx={{ my: 1.8, borderColor: "#e2e8f0" }} />

                        {/* Achievement */}
                        <MainSection title="ACHIEVEMENT" teal={TEAL} scale={scale} />

                        <Stack direction="row" sx={{ alignItems: "flex-start" }} spacing={1}>
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
                                {values.achievement}
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

function ContactRow({ icon, text, scale }: { icon: React.ReactNode; text: string; scale: number }) {
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
    scale,
}: {
    degree: string
    college: string
    year: string
    score: string
    teal: string
    dark: string
    scale: number
}) {
    return (
        <Box sx={{ mb: 1.6 }}>
            <Typography sx={{ fontSize: 11.5 * scale, color: "#64748b", fontStyle: "italic" }}>
                {year}
            </Typography>
            <Typography sx={{ fontSize: 13.5 * scale, fontWeight: 700, color: dark, mt: 0.3 }}>
                {degree}
            </Typography>
            <Typography sx={{ fontSize: 12 * scale, color: teal, fontWeight: 600 }}>
                {college}
            </Typography>
            <Typography sx={{ fontSize: 12 * scale, color: "#475569", mt: 0.2 }}>
                Score: {score}
            </Typography>
        </Box>
    )
}