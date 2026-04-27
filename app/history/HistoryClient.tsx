"use client"

import Navbar from "@/components/Navbar";
import { Box, Typography } from "@mui/material";

import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { ResumeValues } from "../templates/TemplateOne";

export default function HistoryClient() {
    const loginUserStr = localStorage.getItem("prime_cv_authuser")
    const loginUser = loginUserStr ? JSON.parse(loginUserStr) : null
    const userEmail = loginUser?.email || "user_not_authorised"

    const storedResumes = JSON.parse(localStorage.getItem(`prime_cv_resumes_${userEmail}`) || "[]")

    return (
        <Box>
            <Navbar />
            <Typography sx={{ fontSize: "30px", fontWeight: "bold", m: 3 }}>My History</Typography>
            {storedResumes.length === 0
                ? <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "40vh" }}>
                    <HourglassEmptyIcon sx={{ fontSize: 80 }} />
                    <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>You haven&apos;t generated any Resumes yet. Please try to build a new resume.</Typography>
                </Box>
                : <Box sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "column",
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
            }
        </Box >
    )
}