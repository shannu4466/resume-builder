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
    Typography
} from "@mui/material"
import { Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import Navbar from "../../components/Navbar"

import { useRouter } from 'next/navigation'

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

const initialValues = {
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

    achievement: ""
}

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
    const [activeStep, setActiveStep] = useState<number>(0)

    const isLastStep = activeStep === steps.length - 1

    const nextStep = () => setActiveStep(prev => prev + 1)
    const prevStep = () => setActiveStep(prev => prev - 1)

    const router = useRouter()

    const renderFields = (formik: any) => {
        const { values, handleChange, handleBlur, touched, errors, setFieldValue } = formik

        const fieldProps = (name: string, label: string) => ({
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

    const handleSaveUserResumedata = (values: any) => {
        const userId = 1
        if (!userId) {
            alert("User not found")
            return
        }
        const storageKey = `prime_cv_resumes_${userId}`
        const existingResumes =
            JSON.parse(localStorage.getItem(storageKey) || "[]")
        const newResume = {
            resumeId: Date.now(), // unique id
            createdAt: new Date().toISOString(),
            ...values
        }
        const updatedResumes = [...existingResumes, newResume]
        localStorage.setItem(storageKey, JSON.stringify(updatedResumes))
    }

    return (
        <Box>
            <Navbar />

            <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                    Build Your Resume
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                    {steps.map(step => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemas[activeStep]}
                    onSubmit={(values, { setTouched, resetForm }) => {
                        if (isLastStep) {
                            handleSaveUserResumedata(values)
                            resetForm()
                            setTouched({})
                            router.push("/")
                        } else {
                            setTouched({})
                            nextStep()
                        }
                    }}
                >
                    {(formik) => (
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
                </Formik>
            </Box>
        </Box>
    )
}