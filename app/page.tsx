import { Box, Typography, Button, Container, Grid, Paper, Stack } from "@mui/material"
import Navbar from "@/components/Navbar"

const features = [
  {
    title: "ATS Friendly Templates",
    description: "Optimized resume layouts designed to pass Applicant Tracking Systems and improve visibility"
  },
  {
    title: "Instant PDF Download",
    description: "Download your polished resume as a high-quality PDF in seconds with one click"
  },
  {
    title: "Professional Designs",
    description: "Choose from clean, modern, and recruiter-approved templates for every industry"
  },
  {
    title: "Live Preview",
    description: "See real-time changes while editing so your resume always looks perfect"
  },
  {
    title: "Fast & Secure",
    description: "Build resumes quickly with a smooth experience while keeping your data protected"
  }
]

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)",
          py: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} sx={{ alignItems: "center" }} columns={12}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.4rem", md: "4rem" },
                  lineHeight: 1.1,
                  mb: 2,
                  fontWeight:"bold"
                }}
              >
                Build Your Perfect Resume With Prime CV
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 400 }}
              >
                Create modern, job-winning resumes in minutes with smart templates and instant downloads
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  href="/builder"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none"
                  }}
                >
                  Start Building
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="/templates"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none"
                  }}
                >
                  View Templates
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid #e5e7eb",
                  bgcolor: "#ffffff"
                }}
              >
                <Box
                  sx={{
                    height: 500,
                    borderRadius: "18px",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                    p: 3
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Prime CV Template
                  </Typography>

                  <Box sx={{ height: 12, bgcolor: "#2563eb", borderRadius: 5, mb: 2, width: "55%" }} />
                  <Box sx={{ height: 10, bgcolor: "#dbeafe", borderRadius: 5, mb: 3, width: "80%" }} />

                  {[1, 2, 3, 4, 5].map(item => (
                    <Box key={item} sx={{ mb: 3 }}>
                      <Box sx={{ height: 10, bgcolor: "#111827", borderRadius: 5, width: "35%", mb: 1 }} />
                      <Box sx={{ height: 8, bgcolor: "#e5e7eb", borderRadius: 5, width: "100%", mb: 1 }} />
                      <Box sx={{ height: 8, bgcolor: "#e5e7eb", borderRadius: 5, width: "75%" }} />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 6
            }}
          >
            Why Choose Prime CV
          </Typography>

          <Grid container spacing={3}>
            {features.map(item => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "18px",
                    border: "1px solid #e5e7eb",
                    height: "100%"
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "#111827",
          color: "#ffffff",
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2
            }}
          >
            Ready to Get Hired
          </Typography>

          <Typography
            sx={{ opacity: 0.8, mb: 4, textAlign:"center" }}
          >
            Build a resume that stands out and impress recruiters today
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              href="/builder"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none"
              }}
            >
              Create Resume Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box >
  )
}