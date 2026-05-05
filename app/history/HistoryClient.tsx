"use client"

import Navbar from "@/components/Navbar"
import { Box, Button, Typography } from "@mui/material"

import TemplateOne from "../templates/TemplateOne"
import TemplateTwo from "../templates/TemplateTwo"

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import DownloadIcon from "@mui/icons-material/Download"

import { ResumeValues } from "../templates/TemplateOne"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function HistoryClient() {
    const loginUserStr = localStorage.getItem("prime_cv_authuser")
    const loginUser = loginUserStr ? JSON.parse(loginUserStr) : null
    const userEmail = loginUser?.email || "user_not_authorised"

    const storedResumes = JSON.parse(localStorage.getItem(`prime_cv_resumes_${userEmail}`) || "[]")

    const downloadPDF = async (id: string, fileName: string) => {
        const element = document.getElementById(id)

        if (!element) {
            alert("Element not found")
            return
        }

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true
        })

        const imgData = canvas.toDataURL("image/png")
        const pdfWidth = 210
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width
        const pdf = new jsPDF("p", "mm", [pdfHeight, pdfWidth])
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`${fileName}.pdf`)
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Navbar />

            <Box
                sx={{
                    width: "100%",
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                        lg: 8
                    },
                    mt: {
                        xs: 8,
                        sm: 9,
                        md: 10
                    }
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "22px",
                            sm: "26px",
                            md: "30px"
                        },
                        fontWeight: "bold",
                        mb: 3
                    }}
                >
                    My History
                </Typography>

                {storedResumes.length === 0 ? (
                    <Box
                        sx={{
                            display: "grid",
                            placeItems: "center",
                            height: "50vh",
                            textAlign: "center",
                            gap: 2
                        }}
                    >
                        <HourglassEmptyIcon sx={{ fontSize: 80 }} />
                        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                            You haven&apos;t generated any Resumes yet. Please try to build a new resume.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr",
                                md: "1fr 1fr",
                                lg: "1fr 1fr"
                            },
                            gap: {
                                xs: 2,
                                sm: 3,
                                md: 4
                            },
                            width: "100%"
                        }}
                    >
                        {storedResumes.map((eachResume: ResumeValues) => (
                            <Box
                                key={eachResume.resumeId}
                                sx={{
                                    width: "100%",
                                    p: {
                                        xs: 1,
                                        sm: 2
                                    },
                                    boxSizing: "border-box",
                                    display: "grid",
                                    gap: 1.5
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: {
                                            xs: "13px",
                                            sm: "14px"
                                        }
                                    }}
                                >
                                    Date of generation : {new Date(eachResume.createdAt).toLocaleString()}
                                </Typography>

                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",

                                        "& .download-btn": {
                                            opacity: 0,
                                            visibility: "hidden",
                                            transition: "all 0.3s ease"
                                        },

                                        "&:hover .download-btn": {
                                            opacity: 1,
                                            visibility: "visible"
                                        }
                                    }}
                                >
                                    <Box id={String(eachResume.resumeId)}>
                                        {eachResume.templatNumber === "template1" ? (
                                            <TemplateOne values={eachResume} height={900} width="100%" />
                                        ) : (
                                            <TemplateTwo values={eachResume} height={900} width="100%" />
                                        )}
                                    </Box>

                                    <Button
                                        className="download-btn"
                                        onClick={() =>
                                            downloadPDF(
                                                String(eachResume.resumeId),
                                                `Prime_CV_Resume_${eachResume.resumeId}`
                                            )
                                        }
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            minWidth: "40px",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backdropFilter: "blur(20px)",
                                            background: "rgba(255,255,255,0.18)",
                                            border: "1px solid rgba(255,255,255,0.25)",
                                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                                            zIndex: 10,
                                            mr:10
                                        }}
                                    >
                                        <DownloadIcon sx={{ color: "#05ab32" }} />
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}