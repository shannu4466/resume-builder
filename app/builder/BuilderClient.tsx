"use client"

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    FormControlLabel,
    Radio,
    Paper,
} from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from "@mui/icons-material/Download";
import { Formik, FormikProps } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import Navbar from "../../components/Navbar"

import { useRouter } from 'next/navigation'

import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { ResumeValues } from "../templates/TemplateOne";

const steps = [
    "Personal Details",
    "Education",
    "Projects",
    "Skills",
    "Certificates",
    "Achievements"
]

const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Java",
    "Python",
    "C",
    "C++",
    "Git",
    "GitHub",
    "Bootstrap",
    "Tailwind CSS"
]

const initialValues: ResumeValues = {
    name: "Shanmukha Rao Thangudu",
    email: "shannuthangudu@gmail.com",
    phone: "+91 9876543210",
    linkedin: "https://www.linkedin.com/in/shanmukharaothangdu",

    tenthSchool: "Abhydaya high scool",
    tenthPercentage: "92%",

    interCollege: "Narayana Junior College",
    interPercentage: "89%",

    degreeCollege: "Sri vasavi engg college",
    degreePercentage: "8.4 CGPA",

    project1Name: "Student Management System",
    project1Desc: "A web application to manage student records, attendance, and marks efficiently.",
    project1Tech: "React, Node.js, Express, MongoDB",

    project2Name: "Weather Forecast App",
    project2Desc: "An app that shows live weather updates and forecasts using external APIs.",
    project2Tech: "React, JavaScript, OpenWeather API, CSS",

    skills: "JavaScript, React.js, Node.js, MongoDB, HTML, CSS, Git",

    certificateName: "Full Stack Web Development Certification",
    certificateDesc: "Completed training in MERN Stack development including frontend and backend projects.",

    achievement: "Secured first prize in college coding competition."
};

const validationSchemas = [
    Yup.object({
        name: Yup.string().required("*Required"),
        email: Yup.string().email("Invalid email").required("*Required"),
        phone: Yup.string().required("*Required").matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        linkedin: Yup.string().required("*Required").url("Enter a valid Linkedin Url")
    }),

    Yup.object({
        tenthSchool: Yup.string().required("*Required"),
        tenthPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("*Required"),
        interCollege: Yup.string().required("*Required"),
        interPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("*Required"),
        degreeCollege: Yup.string().required("*Required"),
        degreePercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("*Required"),
    }),

    Yup.object({
        project1Name: Yup.string().required("*Required"),
        project1Desc: Yup.string().required("*Required"),
        project1Tech: Yup.string().required("*Required"),
        project2Name: Yup.string().required("*Required"),
        project2Desc: Yup.string().required("*Required"),
        project2Tech: Yup.string().required("*Required")
    }),

    Yup.object({
        skills: Yup.string().required("*Required")
    }),

    Yup.object({
        certificateName: Yup.string().required("*Required"),
        certificateDesc: Yup.string().required("*Required")
    }),

    Yup.object({
        achievement: Yup.string().required("*Required")
    })
]

export default function BuilderClient() {
    const [activeStep, setActiveStep] = useState<number>(5)
    const [seeTemplates, setSeeTemplates] = useState<boolean>(false)
    const [selectedTemplate, setSelectedTemplate] = useState<string>("template1")

    const isLastStep = activeStep === steps.length - 1

    const nextStep = () => setActiveStep(prev => prev + 1)
    const prevStep = () => setActiveStep(prev => prev - 1)

    const router = useRouter()

    const renderFields = (formik: FormikProps<ResumeValues>) => {
        const { values, handleChange, handleBlur, touched, errors, setFieldValue } = formik

        const fieldProps = (name: keyof ResumeValues, label: string) => ({
            fullWidth: true,
            name,
            label,
            value: values[name],
            onChange: handleChange,
            onBlur: handleBlur,
            error: Boolean(touched[name] && errors[name]),
            helperText: touched[name] ? errors[name] : ""
        })

        const addSkill = (skill: string) => {
            const currentSkills = values.skills
                .split(",")
                .map((item: string) => item.trim())
                .filter((item: string) => item)

            if (!currentSkills.includes(skill)) {
                const updated = [...currentSkills, skill].join(", ")
                setFieldValue("skills", updated)
            }
        }

        switch (activeStep) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("name", "Full Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField {...fieldProps("email", "Email")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField {...fieldProps("phone", "Phone Number")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("linkedin", "LinkedIn")} />
                        </Grid>
                    </Grid>
                )

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField {...fieldProps("tenthSchool", "10th School Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField {...fieldProps("tenthPercentage", "10th Percentage")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField {...fieldProps("interCollege", "Inter College Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField {...fieldProps("interPercentage", "Inter Percentage")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField {...fieldProps("degreeCollege", "Degree College Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField {...fieldProps("degreePercentage", "Degree Percentage")} />
                        </Grid>
                    </Grid>
                )

            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6">Project 1</Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("project1Name", "Project Name")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                {...fieldProps("project1Desc", "Project Description")}
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("project1Tech", "Technologies Used (comma seperated)")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6">Project 2</Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("project2Name", "Project Name")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                {...fieldProps("project2Desc", "Project Description")}
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("project2Tech", "Technologies Used (comma seperated)")} />
                        </Grid>
                    </Grid>
                )

            case 3:
                return (
                    <Box>
                        <TextField
                            {...fieldProps("skills", "Skills")}
                            multiline
                            rows={3}
                        />

                        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {skillOptions.map(skill => (
                                <Chip
                                    key={skill}
                                    label={skill}
                                    clickable
                                    onClick={() => addSkill(skill)}
                                />
                            ))}
                        </Box>
                    </Box>
                )

            case 4:
                return (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("certificateName", "Certificate Name")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                {...fieldProps("certificateDesc", "Certificate Description")}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                )

            case 5:
                return (
                    <TextField
                        {...fieldProps("achievement", "Achievement")}
                        multiline
                        rows={4}
                    />
                )

            default:
                return null
        }
    }

    const downloadPDF = async (id: string, fileName: string) => {
        const element = document.getElementById(id);

        if (!element) {
            alert("Element not found");
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const pdf = new jsPDF("p", "mm", [pdfHeight, pdfWidth]);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
    };

    const handleDownload = () => {
        if (selectedTemplate === "template1") {
            downloadPDF("template1", "Prime_CV_Template_1");
        } else {
            downloadPDF("template2", "Prime_CV_Template_2");
        }
    };

    const handleDownloadAndSave = (values: ResumeValues) => {
        const userId = 1
        if (!userId) {
            alert("User not found. Kindly Logout and Login again")
            return
        }
        const storageKey = `prime_cv_resumes_${userId}`
        const existingResumes =
            JSON.parse(localStorage.getItem(storageKey) || "[]")
        // eslint-disable-next-line react-hooks/purity
        const timestamp = Date.now()
        const dateString = new Date(timestamp).toISOString()
        const newResume = {
            templatNumber: selectedTemplate,
            resumeId: timestamp,
            createdAt: dateString,
            ...values
        }
        const updatedResumes = [...existingResumes, newResume]
        localStorage.setItem(storageKey, JSON.stringify(updatedResumes))
    }

    return (
        <Box>
            <Navbar />
            <Typography
                sx={{
                    ml: 5,
                    mb: -10,
                    mt: 5,
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "block",
                        xl: "block"
                    }
                }}
            >
                <ArrowBackIcon
                    onClick={() => router.back()}
                    sx={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        p: 1,
                        "&:hover": {
                            backgroundColor: "gray"
                        }
                    }}
                />
            </Typography>
            <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 4 }}>
                    {seeTemplates ? "Select Template To Download (Download now to view its full content)" : "Build Your Resume"}
                </Typography>

                {!seeTemplates && (
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            mb: 5,
                            width: "100%",
                            "& .MuiStep-root": {
                                flex: 1,
                                minWidth: 0
                            },
                            "& .MuiStepLabel-label": {
                                fontSize: { xs: "10px", sm: "14px" },
                                whiteSpace: "normal",
                                textAlign: "center",
                                wordBreak: "break-word",
                                lineHeight: 1.2
                            },
                            "& .MuiStepIcon-root": {
                                fontSize: { xs: "1.3rem", sm: "1.5rem" }
                            }
                        }}
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemas[activeStep]}
                    onSubmit={(values, { setTouched, resetForm }) => {
                        if (isLastStep) {
                            setSeeTemplates(true)
                            nextStep()
                            resetForm()
                            setTouched({})
                        } else {
                            setTouched({})
                            nextStep()
                        }
                    }}
                >
                    {(formik) => (
                        <>
                            {seeTemplates && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 2,
                                        mb: 2,
                                        flexDirection: {
                                            xs: "column",
                                            sm: "column",
                                            md: "column",
                                            lg: "row"
                                        },
                                        overflowX: "hidden",
                                        ml: {
                                            xs: 0,
                                            lg: -20
                                        }
                                    }}
                                >
                                    {/* Template One */}
                                    <Box sx={{
                                        textAlign: "center", overflowX: "auto", mr: 5,
                                        mb: {
                                            xs: 3,
                                            lg: 0,
                                        },
                                        ml: {
                                            xs: 10,
                                            lg: 0
                                        }
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={selectedTemplate === "template1"}
                                                    onChange={() => setSelectedTemplate("template1")}
                                                />
                                            }
                                            label="Template One"
                                        />

                                        <Box id="template1">
                                            <TemplateOne values={formik.values} height={800} width="100%" />
                                        </Box>
                                    </Box>

                                    {/* Template Two */}
                                    <Box sx={{
                                        textAlign: "center",
                                        ml: {
                                            xs: 0,
                                            md: 5,
                                            lg: 5,
                                        }
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={selectedTemplate === "template2"}
                                                    onChange={() => setSelectedTemplate("template2")}
                                                />
                                            }
                                            label="Template Two"
                                        />

                                        <Box id="template2">
                                            <TemplateTwo values={formik.values} height={800} width="100%" />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            {seeTemplates && (
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
                                    <Button variant="outlined" onClick={() => {
                                        setActiveStep(5)
                                        setSeeTemplates(false)
                                    }}>
                                        EDIT
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        onClick={() => {
                                            handleDownload();
                                            handleDownloadAndSave(formik.values)
                                            router.push("/")
                                        }}
                                        sx={{ borderRadius: "10px", }}
                                    >
                                        Download Resume
                                    </Button>
                                </Box>
                            )}
                            {!seeTemplates && (
                                <form onSubmit={formik.handleSubmit}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 4
                                        }}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            {renderFields(formik)}

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    mt: 4
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    disabled={activeStep === 0}
                                                    onClick={prevStep}
                                                >
                                                    Back
                                                </Button>

                                                <Button variant="contained" type="submit">
                                                    {isLastStep ? "Submit" : "Next"}
                                                </Button>

                                            </Box>
                                        </CardContent>
                                    </Card>
                                </form>
                            )}
                        </>
                    )}
                </Formik>
            </Box>
        </Box >
    )
}