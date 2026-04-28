"use client"
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material"

export type ResumeValues = {
    createdAt: string | number | Date
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
    achievement: string,
    templatNumber: string,
    resumeId: number,
}

type Props = {
    values: ResumeValues
    height?: number | string
    width?: number | string
}

const ACCENT = "#c0392b"
const DARK = "#1c1c2e"
const SIDEBAR_BG = "#1c1c2e"
const SIDEBAR_TEXT = "rgba(255,255,255,0.82)"
const SIDEBAR_MUTED = "rgba(255,255,255,0.5)"

export default function TemplateOne({ values, height, width }: Props) {
    const scale = width ? (typeof width === 'number' ? width / 900 : 1) : 1;

    const skillList = values.skills
        ? values.skills.split(",").map(item => item.trim()).filter(Boolean)
        : []

    const initials = values.name
        ? values.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "NA"

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
                    {/* Avatar block */}
                    <Box
                        sx={{
                            bgcolor: ACCENT,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            py: 3.5,
                            px: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 90 * scale,
                                height: 90 * scale,
                                borderRadius: "50%",
                                border: "3px solid rgba(255,255,255,0.9)",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                                bgcolor: "rgba(255,255,255,0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 28 * scale,
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
                    <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
                        <SidebarSection title="CONTACT" accent={ACCENT} scale={scale} />
                        <SidebarRow label="Email" value={values.email} muted={SIDEBAR_MUTED} text={SIDEBAR_TEXT} scale={scale} />
                        <SidebarRow label="Phone" value={`+91 ${values.phone}`} muted={SIDEBAR_MUTED} text={SIDEBAR_TEXT} scale={scale} />
                        <SidebarRow label="LinkedIn" value={values.linkedin} muted={SIDEBAR_MUTED} text={SIDEBAR_TEXT} scale={scale} />
                    </Box>

                    <Divider sx={{ mx: 2.5, my: 1.8, borderColor: "rgba(255,255,255,0.1)" }} />

                    {/* Skills */}
                    <Box sx={{ px: 2.5, pb: 1 }}>
                        <SidebarSection title="SKILLS" accent={ACCENT} scale={scale} />
                        <Stack spacing={0.5} sx={{ mt: 1 }}>
                            {skillList.map((skill, i) => (
                                <Stack key={i} direction="row" sx={{ alignItems: "flex-start" }} spacing={0.8}>
                                    <Box
                                        sx={{
                                            mt: "7px",
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            bgcolor: ACCENT,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography sx={{ fontSize: 11.5 * scale, color: SIDEBAR_TEXT, lineHeight: 1.85 }}>
                                        {skill}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    <Divider sx={{ mx: 2.5, my: 1.8, borderColor: "rgba(255,255,255,0.1)" }} />

                    {/* Certificate */}
                    <Box sx={{ px: 2.5, pb: 2 }}>
                        <SidebarSection title="CERTIFICATE" accent={ACCENT} scale={scale} />
                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 12.5 * scale,
                                fontWeight: 700,
                                color: "#fff",
                                lineHeight: 1.7,
                            }}
                        >
                            {values.certificateName}
                        </Typography>
                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: 11.5 * scale,
                                color: SIDEBAR_MUTED,
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
                    <Box
                        sx={{
                            bgcolor: DARK,
                            px: 3.5,
                            py: 3,
                            borderBottom: `4px solid ${ACCENT}`,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: `${2.1 * scale}rem`,
                                fontWeight: 700,
                                color: "#fff",
                                fontFamily: "'Georgia', serif",
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                lineHeight: 1.15,
                            }}
                        >
                            {values.name || "Your Name"}
                        </Typography>
                        <Typography
                            sx={{
                                mt: 0.6,
                                fontSize: 12 * scale,
                                color: ACCENT,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                fontFamily: "inherit",
                            }}
                        >
                            Software Developer
                        </Typography>
                    </Box>

                    {/* Body */}
                    <Box sx={{ px: 3.5, py: 2.8, flex: 1 }}>

                        {/* Projects */}
                        <MainSection title="PROJECTS" accent={ACCENT} scale={1} />

                        <ProjectCard
                            name={values.project1Name}
                            desc={values.project1Desc}
                            tech={values.project1Tech}
                            accent={ACCENT}
                            scale={1}
                        />

                        <ProjectCard
                            name={values.project2Name}
                            desc={values.project2Desc}
                            tech={values.project2Tech}
                            accent={ACCENT}
                            scale={1}
                        />

                        <Divider sx={{ my: 2, borderColor: "#e2e8f0" }} />

                        {/* Education */}
                        <MainSection title="EDUCATION" accent={ACCENT} scale={0} />
                        <MainSection title="EDUCATION" accent={ACCENT} scale={scale} />

                        <EduRow
                            degree="B.Tech – CSE"
                            college={values.degreeCollege}
                            year="2022 – 2026"
                            score={`${values.degreePercentage}%`}
                            accent={ACCENT}
                            scale={scale}
                        />
                        <EduRow
                            degree="Intermediate"
                            college={values.interCollege}
                            year="2020 – 2022"
                            score={`${values.interPercentage}%`}
                            accent={ACCENT}
                            scale={scale}
                        />
                        <EduRow
                            degree="Secondary Education"
                            college={values.tenthSchool}
                            year="2019 – 2020"
                            score={`${values.tenthPercentage}%`}
                            accent={ACCENT}
                            scale={scale}
                        />

                        <Divider sx={{ my: 2, borderColor: "#e2e8f0" }} />

                        {/* Achievement */}
                        <MainSection title="ACHIEVEMENT" accent={ACCENT} scale={scale} />

                        <Stack direction="row" sx={{ alignItems: "flex-start" }} spacing={1}>
                            <Box
                                sx={{
                                    mt: "7px",
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    bgcolor: ACCENT,
                                    flexShrink: 0,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 12.5 * scale,
                                    color: "#475569",
                                    lineHeight: 1.85,
                                }}
                            >
                                {values.achievement}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

function SidebarSection({ title, accent, scale }: { title: string; accent: string; scale: number }) {
    return (
        <Typography
            sx={{
                fontSize: 12 * scale,
                fontWeight: 700,
                color: accent,
                letterSpacing: 1,
                textTransform: "uppercase",
                mb: 1,
                borderBottom: `1.5px solid ${accent}`,
                pb: 0.5,
            }}
        >
            {title}
        </Typography>
    )
}

function SidebarRow({
    label,
    value,
    muted,
    text,
    scale,
}: {
    label: string
    value: string
    muted: string
    text: string
    scale: number
}) {
    return (
        <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: 10 * scale, color: muted, letterSpacing: 1, textTransform: "uppercase" }}>
                {label}
            </Typography>
            <Typography sx={{ fontSize: 11.5 * scale, color: text, lineHeight: 1.7, wordBreak: "break-all" }}>
                {value}
            </Typography>
        </Box>
    )
}

function MainSection({ title, accent, scale }: { title: string; accent: string; scale: number }) {
    return (
        <Typography
            sx={{
                fontSize: 13 * scale,
                fontWeight: 700,
                color: accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                mb: 1.4,
                borderBottom: `2px solid ${accent}`,
                pb: 0.5,
            }}
        >
            {title}
        </Typography>
    )
}

function ProjectCard({
    name,
    desc,
    tech,
    accent,
    scale,
}: {
    name: string
    desc: string
    tech: string
    accent: string
    scale: number
}) {
    return (
        <Box
            sx={{
                mb: 1.8,
                pl: 1.5,
                borderLeft: `3px solid ${accent}`,
            }}
        >
            <Typography
                sx={{
                    fontSize: 13.5 * scale,
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.5,
                }}
            >
                {name}
            </Typography>
            <Typography
                sx={{
                    mt: 0.5,
                    fontSize: 12 * scale,
                    color: "#475569",
                    lineHeight: 1.8,
                }}
            >
                {desc}
            </Typography>
            <Typography
                sx={{
                    mt: 0.5,
                    fontSize: 11.5 * scale,
                    fontWeight: 700,
                    color: accent,
                }}
            >
                Stack: {tech}
            </Typography>
        </Box>
    )
}

function EduRow({
    degree,
    college,
    year,
    score,
    accent,
    scale,
}: {
    degree: string
    college: string
    year: string
    score: string
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