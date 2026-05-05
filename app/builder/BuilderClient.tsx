/* eslint-disable @typescript-eslint/no-explicit-any */
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
    MenuItem,
    Radio,
    Step,
    StepButton,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps, getIn, setIn, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Navbar from "../../components/Navbar";

import { useRouter } from 'next/navigation';

import TemplateOne, { ResumeValues as TemplateOneValues } from "../templates/TemplateOne";
import TemplateTwo, { ResumeValues as TemplateTwoValues } from "../templates/TemplateTwo";

import dayjs from 'dayjs';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from 'react';

type ResumeValues = {
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
    templatNumber: string | null | undefined
    resumeId: string | null | undefined
    createdAt: string | number | Date
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

// const initialValues: ResumeValues = {
//     name: "Shanmukha Rao",
//     email: "shannuthangudu@example.com",
//     phone: "9876543210",
//     linkedin: "https://linkedin.com/in/shannuthangudu",

//     tenthSchool: "Sri Chaitanya High School",
//     tenthPercentage: "92",

//     interCollege: "Narayana Junior College",
//     interPercentage: "94",
//     interType: "intermediate",

//     degreeType: "btech",
//     customDegree: "",
//     degreeBranch: "Computer Science and Engineering",
//     degreeCollege: "Sri vasavi engineering college",
//     degreePercentage: "87",

//     projects: [
//         {
//             name: "E-commerce Web App",
//             desc: "Developed a full-stack e-commerce application with user authentication, cart, and payment integration.",
//             tech: "React, Node.js, Express, MongoDB"
//         },
//         {
//             name: "Chat Application",
//             desc: "Built a real-time chat app supporting multiple users and rooms with WebSocket integration.",
//             tech: "React, Socket.io, Node.js"
//         },
//         {
//             name: "Resume Builder",
//             desc: "Created a dynamic resume builder allowing users to generate and download resumes with templates.",
//             tech: "React, TypeScript, Tailwind CSS"
//         }
//     ],

//     skills: "Python, JavaScript, Java, TypeScript, React, Node.js, MongoDB, SQL",
//     skillRatings: {
//         Python: 4,
//         JavaScript: 5,
//         Java: 4,
//         TypeScript: 4,
//         React: 5,
//         "Node.js": 4,
//         MongoDB: 4,
//         SQL: 3
//     },

//     certificateName: "Full Stack Web Development",
//     certificateDesc: "Completed a comprehensive course covering MERN stack development with real-world projects.",

//     achievement: "Secured 2nd place in a national-level hackathon for developing an AI-based recommendation system.",

//     templatNumber: "1",
//     resumeId: "RES123456",
//     createdAt: "2026-05-05",

//     workExperience: [
//         {
//             jobTitle: "Frontend Developer Intern",
//             companyName: "Tech Solutions Pvt Ltd",
//             Location: "Hyderabad",
//             startDate: "2025-01-01",
//             endDate: "2025-04-30",
//             responsibilities: "Developed responsive UI components using React and improved page performance by 20%."
//         },
//         {
//             jobTitle: "Backend Developer Intern",
//             companyName: "CodeCraft Labs",
//             Location: "Bangalore",
//             startDate: "2024-06-01",
//             endDate: "2024-08-31",
//             responsibilities: "Built REST APIs and integrated MongoDB for scalable backend services."
//         },
//         {
//             jobTitle: "Software Intern",
//             companyName: "InnovateX",
//             Location: "Remote",
//             startDate: "2023-12-01",
//             endDate: "2024-02-28",
//             responsibilities: "Assisted in debugging, testing, and deploying web applications."
//         }
//     ],
// };


const initialValues: ResumeValues = {
    name: "",
    email: "",
    phone: "",
    linkedin: "",

    tenthSchool: "",
    tenthPercentage: "",

    interCollege: "",
    interPercentage: "",
    interType: "intermediate",

    degreeType: "btech",
    customDegree: "",
    degreeBranch: "",
    degreeCollege: "",
    degreePercentage: "",

    projects: [
        { name: "", desc: "", tech: "" }
    ],

    skills: "",
    skillRatings: {},

    certificateName: "",
    certificateDesc: "",

    achievement: "",
    templatNumber: "",
    resumeId: "",
    createdAt: '',
    workExperience: [
        { jobTitle: "", companyName: "", Location: "", startDate: "", endDate: "", responsibilities: "" }
    ],
};

const validationSchemas = [
    Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Required"),
        linkedin: Yup.string().url("Enter a valid Linkedin Url")
    }),

    Yup.object({
        tenthSchool: Yup.string().required("Required"),
        tenthPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("Required"),

        interType: Yup.string().required("Required"),
        interCollege: Yup.string().required("Required"),
        interPercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("Required"),

        degreeType: Yup.string().required("Required"),
        customDegree: Yup.string().when("degreeType", {
            is: "other",
            then: (schema) => schema.required("Please specify your degree"),
            otherwise: (schema) => schema.notRequired()
        }),
        degreeCollege: Yup.string().required("Required"),
        degreeBranch: Yup.string().required("Required"),
        degreePercentage: Yup.number().min(0, "Percentage should not be less than 0").max(100, "Percentage should not be more than 100").required("Required"),
    }),

    Yup.object({
        projects: Yup.array()
            .of(
                Yup.object({
                    name: Yup.string(),
                    desc: Yup.string(),
                    tech: Yup.string(),
                })
            )
            .max(3, "Maximum 3 projects allowed"),
    }),

    Yup.object({
        skills: Yup.string().required("Required"),
        skillRatings: Yup.object().test(
            "all-skills-rated",
            "Each skill must have a rating",
            function (value: Record<string, any> | undefined) {
                const { skills } = this.parent;
                if (!skills) return true;
                const skillList = skills
                    .split(",")
                    .map((s: any) => s.trim())
                    .filter(Boolean);
                for (const skill of skillList) {
                    const rating = value?.[skill];
                    if (rating === undefined || rating === null || rating === "") {
                        return this.createError({
                            path: `skillRatings.${skill}`,
                            message: "Required",
                        });
                    }
                    if (rating < 1 || rating > 10) {
                        return this.createError({
                            path: `skillRatings.${skill}`,
                            message: "Must be between 1 and 10",
                        });
                    }
                }
                return true;
            }
        ),
    }),

    Yup.object({
        workExperience: Yup.array().of(
            Yup.object({
                jobTitle: Yup.string(),
                companyName: Yup.string(),
                Location: Yup.string(),

                startDate: Yup.date()
                    .nullable()
                    .transform((value, originalValue) =>
                        originalValue === "" ? null : value 
                    )
                    .max(new Date(), "Start date cannot be in the future"),

                endDate: Yup.date()
                    .nullable()
                    .transform((value, originalValue) =>
                        originalValue === "" ? null : value 
                    )
                    .test(
                        "is-after-start",
                        "End date must be later than start date",
                        function (value) {
                            const { startDate } = this.parent;

                            if (!startDate || !value) return true;

                            return dayjs(value)
                                .startOf("day")
                                .isAfter(dayjs(startDate).startOf("day"));
                        }
                    ),

                responsibilities: Yup.string(),
            })
        ),
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

    const fullValidationSchema = Yup.object().shape(
        validationSchemas.reduce((acc, schema) => {
            return { ...acc, ...(schema as any).fields }
        }, {})
    )

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemas[activeStep],
        onSubmit: async (values, { setTouched, setErrors }) => {
            if (isLastStep) {
                try {
                    await fullValidationSchema.validate(values, { abortEarly: false });
                    setSeeTemplates(true);
                    nextStep();
                    setTouched({});
                } catch (err: unknown) {
                    let errors: any = {}
                    let touched: any = {}
                    if (err instanceof Yup.ValidationError) {
                        err.inner.forEach((e: Yup.ValidationError) => {
                            if (e.path) {
                                errors = setIn(errors, e.path, e.message)
                                touched = setIn(touched, e.path, true)
                            }
                        })
                        setErrors(errors);
                        setTouched(touched);
                        const firstErrorField =
                            err.inner && err.inner.length > 0
                                ? err.inner[0].path
                                : err.path;

                        if (firstErrorField) {
                            const rootField = firstErrorField.split(/[\[.]/)[0];
                            const stepIndex = validationSchemas.findIndex((schema) =>
                                Object.prototype.hasOwnProperty.call(schema.fields, rootField)
                            );

                            if (stepIndex !== -1) {
                                setActiveStep(stepIndex)
                                setTimeout(() => {
                                    formik.validateForm();
                                }, 0);
                            }
                        }
                    }

                    return;
                }
            } else {
                setTouched({});
                nextStep();
            }
        },
    })

    const renderFields = (formik: FormikProps<ResumeValues>) => {
        const { values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldTouched } = formik

        const fieldProps = (name: string, label: string) => ({
            fullWidth: true,
            name,
            label,
            value: name.includes('[')
                ? name.split(/[\[\].]+/).filter(Boolean).reduce((obj: any, key) => obj?.[key], values)
                : (values as any)[name],
            onChange: handleChange,
            onBlur: handleBlur,
            error: Boolean(
                name.includes('[')
                    ? name.split(/[\[\].]+/).filter(Boolean).reduce((obj: any, key) => obj?.[key], touched) &&
                    name.split(/[\[\].]+/).filter(Boolean).reduce((obj: any, key) => obj?.[key], errors)
                    : (touched as any)[name] && (errors as any)[name]
            ),
            helperText: (name.includes('[')
                ? name.split(/[\[\].]+/).filter(Boolean).reduce((obj: any, key) => obj?.[key], touched) &&
                name.split(/[\[\].]+/).filter(Boolean).reduce((obj: any, key) => obj?.[key], errors)
                : (touched as any)[name] ? (errors as any)[name] : "") as string,
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
                        {/* 10th Details */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6">10th Details</Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField {...fieldProps("tenthSchool", "10th School Name")} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField {...fieldProps("tenthPercentage", "10th Percentage")} />
                        </Grid>


                        {/* Intermediate / Diploma */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6">Intermediate / Diploma</Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                select
                                {...fieldProps("interType", "Select Type")}
                            >
                                <MenuItem value="intermediate">Intermediate</MenuItem>
                                <MenuItem value="diploma">Diploma</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                {...fieldProps("interCollege", "College Name")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                {...fieldProps("interPercentage", "Percentage")}
                            />
                        </Grid>

                        {/* Degree Details */}
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="h6">Degree Details</Typography>
                            </Grid>

                            {/* Degree Type */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    select
                                    {...fieldProps("degreeType", "Degree Type")}
                                >
                                    <MenuItem value="btech">B.Tech</MenuItem>
                                    <MenuItem value="bsc">B.Sc</MenuItem>
                                    <MenuItem value="bcom">B.Com</MenuItem>
                                    <MenuItem value="ba">B.A</MenuItem>
                                    <MenuItem value="accounting">Accounting</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>

                            {values.degreeType === "other" && (
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        {...fieldProps("customDegree", "Enter Degree Name")}
                                    />
                                </Grid>
                            )}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    {...fieldProps("degreeCollege", "College Name")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    {...fieldProps("degreeBranch", "Branch / Department")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    {...fieldProps("degreePercentage", "Percentage")}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )

            case 2:
                return (
                    <Grid container spacing={3}>
                        {(values.projects ?? []).map((project, index) => (
                            <React.Fragment key={index}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6">Project {index + 1}</Typography>
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField {...fieldProps(`projects[${index}].name`, "Project Name")} />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        {...fieldProps(`projects[${index}].desc`, "Project Description")}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        {...fieldProps(`projects[${index}].tech`, "Technologies Used (comma separated)")}
                                    />
                                </Grid>

                                {values.projects.length > 1 && (
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                                const updated = values.projects.filter((_, i) => i !== index)
                                                setFieldValue("projects", updated)
                                            }}
                                        >
                                            Remove Project
                                        </Button>
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}

                        {values.projects.length < 3 && (
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        setFieldValue("projects", [
                                            ...values.projects,
                                            { name: "", desc: "", tech: "" }
                                        ])
                                    }
                                    sx={{ backgroundColor: "#05ab32" }}
                                >
                                    Add Project
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                )

            case 3:
                return (
                    <Box>
                        <TextField
                            {...fieldProps("skills", "Skills")}
                            onChange={(e) => {
                                fieldProps("skills", "Skills").onChange(e);
                                const newSkills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                const updatedRatings = Object.fromEntries(
                                    Object.entries(values.skillRatings || {}).filter(([key]) =>
                                        newSkills.includes(key)
                                    )
                                );
                                setFieldValue('skillRatings', updatedRatings);
                            }}
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
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.5rem",
                                minWidth: { sm: "150px" },
                                mt: 2,
                                mb: 2
                            }}>Rate yourself in each skill out of 10 (By default 0)
                        </Typography>
                        {formik.values.skills.split(',').map((eachSkill, index) => {
                            const skill = eachSkill.trim();
                            if (!skill) return null;

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        alignItems: { xs: "flex-start", sm: "center" },
                                        justifyContent: "space-between",
                                        gap: 2,
                                        p: 2,
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 2,
                                        m: 1.5,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "0.95rem",
                                            minWidth: { sm: "150px" },
                                        }}
                                    >
                                        {skill}
                                    </Typography>

                                    <TextField
                                        placeholder="Rating out of 10"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        sx={{
                                            maxWidth: { sm: "300px" },
                                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                WebkitAppearance: "none",
                                                margin: 0,
                                            },
                                        }}
                                        name={`skillRatings.${skill}`}
                                        value={values.skillRatings?.[skill] ?? ""}
                                        onChange={(e) => {
                                            const val = e.target.value === "" ? "" : Number(e.target.value);
                                            setFieldValue("skillRatings", {
                                                ...values.skillRatings,
                                                [skill]: val
                                            });
                                        }}
                                        onBlur={() => setFieldTouched("skillRatings", true)}
                                        slotProps={{ htmlInput: { min: 1, max: 10 } }}
                                        error={
                                            Boolean(touched.skillRatings) &&
                                            Boolean((errors.skillRatings as any)?.[skill])
                                        }
                                        helperText={
                                            touched.skillRatings &&
                                            (errors.skillRatings as any)?.[skill]
                                        }
                                        color="success"
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                )

            case 4:
                return (
                    <Grid container spacing={3}>
                        {(values.workExperience ?? []).map((exp, index) => (
                            <React.Fragment key={index}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6">Work Experience {index + 1}</Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField {...fieldProps(`workExperience[${index}].jobTitle`, "Job Title")} />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField {...fieldProps(`workExperience[${index}].companyName`, "Company Name")} />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField {...fieldProps(`workExperience[${index}].Location`, "Location (e.g. Remote, New York)")} />
                                </Grid>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <DatePicker
                                            label="Start Date"
                                            disableFuture
                                            value={exp.startDate ? dayjs(exp.startDate) : null}
                                            onChange={(newValue) => {
                                                const value = newValue ? newValue.toDate() : null;

                                                setFieldValue(`workExperience[${index}].startDate`, value);
                                                setFieldTouched(`workExperience[${index}].startDate`, true);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error:
                                                        getIn(touched, `workExperience[${index}].startDate`) &&
                                                        Boolean(getIn(errors, `workExperience[${index}].startDate`)),
                                                    helperText:
                                                        getIn(touched, `workExperience[${index}].startDate`) &&
                                                        getIn(errors, `workExperience[${index}].startDate`),
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <DatePicker
                                            label="End Date"
                                            disableFuture
                                            value={exp.endDate ? dayjs(exp.endDate) : null}
                                            onChange={(newValue) => {
                                                const value = newValue ? newValue.toDate() : null;

                                                setFieldValue(`workExperience[${index}].endDate`, value);
                                                setFieldTouched(`workExperience[${index}].endDate`, true);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error:
                                                        getIn(touched, `workExperience[${index}].endDate`) &&
                                                        Boolean(getIn(errors, `workExperience[${index}].endDate`)),
                                                    helperText:
                                                        getIn(touched, `workExperience[${index}].endDate`) &&
                                                        getIn(errors, `workExperience[${index}].endDate`),
                                                },
                                            }}
                                        />
                                    </Grid>
                                </LocalizationProvider>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        {...fieldProps(`workExperience[${index}].responsibilities`, "Responsibilities")}
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                {values.workExperience.length > 1 && (
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            color="error"
                                            onClick={() => {
                                                const updated = values.workExperience.filter((_, i) => i !== index)
                                                setFieldValue("workExperience", updated)
                                            }}
                                            variant="contained"
                                        >
                                            Remove Experience
                                        </Button>
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}

                        {(values.workExperience ?? []).length < 3 && (
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        setFieldValue("workExperience", [
                                            ...(values.workExperience ?? []),
                                            { jobTitle: "", companyName: "", Location: "", startDate: "", endDate: "", responsibilities: "" }
                                        ])
                                    }
                                    sx={{ backgroundColor: "#05ab32" }}
                                >
                                    Add Experience
                                </Button>
                            </Grid>
                        )}
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
        const loginUserStr = localStorage.getItem("prime_cv_authuser");
        const loginUser = loginUserStr ? JSON.parse(loginUserStr) : null;
        const userEmail = loginUser?.email || "user_not_authorised";

        if (!userEmail) {
            alert("User not found. Kindly Logout and Login again");
            return;
        }

        const isEmptyObject = (obj: any) =>
            !obj || Object.values(obj).every(val => !val || val === "");

        const cleanedValues = {
            ...values,
            workExperience: (values.workExperience || []).filter(exp => !isEmptyObject(exp)),
            projects: (values.projects || []).filter(proj => !isEmptyObject(proj))
        };

        const storageKey = `prime_cv_resumes_${userEmail}`;
        const existingResumes = JSON.parse(localStorage.getItem(storageKey) || "[]");

        const timestamp = Date.now();
        const dateString = new Date(timestamp).toISOString();

        const newResume = {
            ...cleanedValues,
            templatNumber: selectedTemplate,
            resumeId: String(timestamp),
            createdAt: dateString,
        };

        const updatedResumes = [...existingResumes, newResume];
        localStorage.setItem(storageKey, JSON.stringify(updatedResumes));
    };

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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
                                    color: "#9ca3af",
                                },

                                "& .MuiStepLabel-label.Mui-active": {
                                    color: "#05ab32",
                                    fontWeight: 600,
                                },

                                "& .MuiStepLabel-label.Mui-completed": {
                                    color: "#047857",
                                    fontWeight: 600,
                                },

                                "& .MuiStepIcon-root": {
                                    fontSize: { xs: "1.3rem", sm: "1.5rem" },
                                    color: "#d1d5db",
                                },

                                "& .MuiStepIcon-root.Mui-active": {
                                    color: "#05ab32",
                                },

                                "& .MuiStepIcon-root.Mui-completed": {
                                    color: "#047857",
                                },

                                "& .MuiStepConnector-line": {
                                    borderColor: "#d1d5db",
                                    borderTopWidth: 2,
                                },

                                "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                                    borderColor: "#047857",
                                },

                                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                                    borderColor: "#05ab32",
                                },
                            }}
                        >
                            {steps.map((step) => (
                                <Step
                                    key={step.id}
                                    completed={activeStep > step.id}
                                    onClick={() => { setActiveStep(step.id) }}
                                    sx={{ cursor: "pointer" }}
                                >
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
                                        overflowX: "auto", mr: 5,
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
                                            <TemplateOne values={formik.values} height={850} width="100%" submit={seeTemplates} />
                                        </Box>
                                    </Box>

                                    {/* Template Two */}
                                    <Box sx={{
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
                                            <TemplateTwo values={formik.values as TemplateTwoValues} height={850} width="100%" submit={seeTemplates} />
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
                {!seeTemplates && (
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "none",
                                md: "none",
                                lg: "flex"
                            },
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
                        {selectedTemplate === "template1" ? <TemplateOne values={formik.values as TemplateOneValues} height={850} width="80%" submit={seeTemplates} /> : <TemplateTwo values={formik.values as TemplateTwoValues} height={850} width="80%" submit={seeTemplates} />}
                    </Box>
                )}
            </Box>
        </Box >
    )
}