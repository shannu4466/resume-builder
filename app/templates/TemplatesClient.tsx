import { Box, Typography } from "@mui/material";
import Navbar from "@/components/Navbar";

import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";

const defaultValues = {
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
const templatePageStyles = {
    width: "100%",
    maxWidth: "980px",
    minHeight: "1123px",
    height: "1123px",
    borderRadius: { xs: 2, sm: 3, md: 4 },
    overflow: "hidden",
    bgcolor: "#fff",
    boxSizing: "border-box",
    mb: -40
}
export default function TemplatesClient() {
    return (
        <Box>
            <Navbar />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        mt: 2,
                        mb: 2,
                        gap: 3,
                        flexDirection: {
                            xs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row"
                        },
                    }}
                >
                    <Box sx={templatePageStyles}>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                mb: 2,
                                textAlign: "center"
                            }}
                        >
                            Template 1
                        </Typography>
                        <TemplateOne values={defaultValues} height={700} width="90%" />
                    </Box>

                    <Box sx={templatePageStyles}>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                mb: 2,
                                textAlign: "center"
                            }}
                        >
                            Template 2
                        </Typography>
                        <TemplateTwo values={defaultValues} height={700} width="90%" />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}