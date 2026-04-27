"use client"

import { Box, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";

import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";

import { ResumeValues } from "../templates/TemplateOne";

export default function HistoryClient() {
    const storedResumes = JSON.parse(localStorage.getItem("prime_cv_resumes_1") || "{}")

    return (
        <Box>
            <Navbar />
            <Typography sx={{ fontSize: "30px", fontWeight: "bold", m: 3 }}>My History</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column", md: "column",
                    lg: "row"
                },
                justifyContent: "space-between",
                alignItems: "center",
                overflowX: "hidden"
            }}>
                {storedResumes.map((eachResume: ResumeValues) => (
                    <Box key={eachResume.resumeId} sx={{ m: 2 }}>
                        {eachResume.templatNumber === "template1"
                            ? <TemplateOne values={eachResume} height={900} width="90%" />
                            : <TemplateTwo values={eachResume} height={900} width="90%" />}
                    </Box>
                ))}
            </Box>
        </Box >
    )
}