"use client"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from "@mui/icons-material/Download";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControlLabel,
    Grid,
    Radio,
    Step,
    StepButton,
    Stepper,
    TextField,
    Typography
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";

import { useRouter } from 'next/navigation';

import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";

import dayjs from 'dayjs';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    templatNumber?: string
    resumeId?: number
    createdAt?: string
}

const steps = [
    { stepName: "Personal Details", id: 0 },
    { stepName: "Education", id: 1 },
    { stepName: "Projects", id: 2 },
    { stepName: "Skills", id: 3 },
    { stepName: "Work Experience", id: 4 },
    { stepName: "Certificates", id: 5 },
    { stepName: "Achievements", id: 6 },
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
    name: "",
    email: "",
    phone: "",
    linkedin: "",

    tenthSchool: "",
    tenthPercentage: "",

    interCollege: "",
    interPercentage: "",

    degreeCollege: "",
    degreePercentage: "",

    project1Name: "",
    project1Desc: "",
    project1Tech: "",

    project2Name: "",
    project2Desc: "",
    project2Tech: "",

    skills: "",

    certificateName: "",
    certificateDesc: "",

    achievement: "",
    templatNumber: "",
    resumeId: 0,
    createdAt: '',
    jobTitle: '',
    companyName: '',
    Location: '',
    startDate: '',
    endDate: '',
    responsibilities: ''
};

const validationSchemas = [
    Yup.object({
        name: Yup.string(),
        email: Yup.string().email("Invalid email"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        linkedin: Yup.string().url("Enter a valid Linkedin Url")
    }),

    Yup.object({
        tenthSchool: Yup.string(),
        tenthPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100"),
        interCollege: Yup.string(),
        interPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100"),
        degreeCollege: Yup.string(),
        degreePercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100"),
    }),

    Yup.object({
        project1Name: Yup.string(),
        project1Desc: Yup.string(),
        project1Tech: Yup.string(),
        project2Name: Yup.string(),
        project2Desc: Yup.string(),
        project2Tech: Yup.string()
    }),

    Yup.object({
        skills: Yup.string()
    }),

    Yup.object({
        jobTitle: Yup.string(),
        companyName: Yup.string(),
        Location: Yup.string(),
        startDate: Yup.string(),
        endDate: Yup.string(),
        responsibilities: Yup.string()
    }),

    Yup.object({
        certificateName: Yup.string(),
        certificateDesc: Yup.string()
    }),

    Yup.object({
        achievement: Yup.string()
    })
]

export default function BuilderClient() {
    const [activeStep, setActiveStep] = useState<number>(0)
    const [seeTemplates, setSeeTemplates] = useState<boolean>(false)
    const [selectedTemplate, setSelectedTemplate] = useState<string>("template1")

    const isLastStep = activeStep === steps.length - 1

    const nextStep = () => setActiveStep(prev => prev + 1)
    const prevStep = () => setActiveStep(prev => prev - 1)

    const router = useRouter()

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemas[activeStep],
        onSubmit: (values, { setTouched }) => {
            if (isLastStep) {
                setSeeTemplates(true)
                nextStep()
                setTouched({})
            } else {
                setTouched({})
                nextStep()
            }
        }
    })

    console.log(formik)

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
            helperText: touched[name] ? errors[name] : "",
            color: "success" as const
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
                            <TextField {...fieldProps("interCollege", "Intermediate/Diploma College Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField {...fieldProps("interPercentage", "Intermediate/Diploma Percentage")} />
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
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField {...fieldProps("jobTitle", "Job Title")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField {...fieldProps("companyName", "Company Name")} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("Location", "Location (e.g. Remote, New York)")} />
                        </Grid>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <DatePicker
                                    label="Start Date"
                                    value={values.startDate ? dayjs(values.startDate) : null}
                                    onChange={(newValue: dayjs.Dayjs | null) => setFieldValue("startDate", newValue ? newValue.toISOString() : "")}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: Boolean(touched.startDate && errors.startDate),
                                            helperText: touched.startDate ? errors.startDate : ""
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <DatePicker
                                    label="End Date"
                                    value={values.endDate ? dayjs(values.endDate) : null}
                                    onChange={(newValue: dayjs.Dayjs | null) => setFieldValue("endDate", newValue ? newValue.toISOString() : "")}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: Boolean(touched.endDate && errors.endDate),
                                            helperText: touched.endDate ? errors.endDate : ""
                                        }
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>

                        <Grid size={{ xs: 12 }}>
                            <TextField {...fieldProps("responsibilities", "Responsibilities")} multiline rows={4} />
                        </Grid>
                    </Grid>
                )

            case 5:
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

            case 6:
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
            downloadPDF("template1", "Prime_CV_Resume_Template_1");
        } else {
            downloadPDF("template2", "Prime_CV_Resume_Template_2");
        }
    };

    const handleDownloadAndSave = (values: ResumeValues) => {
        const loginUserStr = localStorage.getItem("prime_cv_authuser")
        const loginUser = loginUserStr ? JSON.parse(loginUserStr) : null
        const userEmail = loginUser?.email || "user_not_authorised"

        if (!userEmail) {
            alert("User not found. Kindly Logout and Login again")
            return
        }
        const storageKey = `prime_cv_resumes_${userEmail}`
        const existingResumes = JSON.parse(localStorage.getItem(storageKey) || "[]")
        // eslint-disable-next-line react-hooks/purity
        const timestamp = Date.now()
        const dateString = new Date(timestamp).toISOString()
        const newResume = {
            ...values,
            templatNumber: selectedTemplate,
            resumeId: timestamp,
            createdAt: dateString,
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
                    },
                }}
            >
                <ArrowBackIcon
                    onClick={() => router.back()}
                    sx={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        p: 1,
                        "&:hover": {
                            backgroundColor: "#05ab32"
                        },
                    }}
                />
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                                    minWidth: 0,
                                },

                                "& .MuiStepLabel-label": {
                                    fontSize: { xs: "10px", sm: "14px" },
                                    whiteSpace: "normal",
                                    textAlign: "center",
                                    wordBreak: "break-word",
                                    lineHeight: 1.2,
                                    color: "#05ab32",
                                },

                                "& .MuiStepLabel-label.Mui-active": {
                                    color: "#05ab32",
                                    fontWeight: 600,
                                },

                                "& .MuiStepLabel-label.Mui-completed": {
                                    color: "#05ab32",
                                    fontWeight: 600,
                                },

                                "& .MuiStepIcon-root": {
                                    fontSize: { xs: "1.3rem", sm: "1.5rem" },
                                    color: "#05ab32",
                                },

                                "& .MuiStepIcon-root.Mui-active": {
                                    color: "#05ab32",
                                },

                                "& .MuiStepIcon-root.Mui-completed": {
                                    color: "#05ab32",
                                },

                                "& .MuiStepConnector-line": {
                                    borderColor: "#05ab32",
                                    borderTopWidth: 2,
                                },
                            }}
                        >
                            {steps.map((step) => (
                                <Step key={step.id} onClick={() => { setActiveStep(step.id) }} sx={{ cursor: "pointer" }}>
                                    <StepButton>{step.stepName}</StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    )}
                    <Box>
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
                                                    color="success"
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
                                                    color="success"
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
                                    <Button variant="outlined" sx={{ color: "#05ab32", borderColor: "#05ab32" }}
                                        onClick={() => {
                                            setActiveStep(6)
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
                                            formik.resetForm()
                                            router.push("/")
                                        }}
                                        sx={{ borderRadius: "10px", backgroundColor: "#05ab32", color: "white" }}
                                    >
                                        Download Resume
                                    </Button>
                                </Box>
                            )}
                            {!seeTemplates && (
                                <form onSubmit={formik.handleSubmit} className='w-[50%]'>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: "1px solid #e5e7eb",
                                            borderRadius: 4,
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
                                                    sx={{ backgroundColor: "#05ab32", color: "white" }}
                                                >
                                                    Back
                                                </Button>

                                                <Button variant="contained" type="submit" sx={{ backgroundColor: "#05ab32" }}>
                                                    {isLastStep ? "Submit" : "Next"}
                                                </Button>

                                            </Box>
                                        </CardContent>

                                    </Card>

                                </form>
                            )}
                        </>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                        mb: 2,
                        overflowX: "hidden",
                        ml: {
                            xs: 0,
                            lg: -20
                        },
                        width: "40%"
                    }}
                >
                    <Box sx={{ display: "flex" }}>
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
                                        color="success"
                                    />
                                }
                                label="Template One"
                            />
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
                                        color="success"
                                    />
                                }
                                label="Template Two"
                            />
                        </Box>
                    </Box>
                    {selectedTemplate === "template1" ? <TemplateOne values={formik.values} height={850} width="80%" /> : <TemplateTwo values={formik.values} height={850} width="80%" />}
                </Box>
            </Box>
        </Box >
    )
}