"use client"

import * as Tabs from "@radix-ui/react-tabs"
import CryptoJS from "crypto-js"
const secretKey = "qwertyuiopasdfghjklzxcvbnm"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { User, useAuth } from "@/context/AuthContext"
import { useLoginPageStore } from '../store'

// import Image from "next/image"

type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

type SignupFormData = {
    email: string
    password: string
    confirmPassword: string
}

export default function AuthClient() {
    const router = useRouter()
    const { login } = useAuth()

    const showPassword = useLoginPageStore((state) => state.showPassword)
    const setShowPassword = useLoginPageStore((state) => state.setShowPassword)
    const userInvalid = useLoginPageStore((state) => state.userInvalid)
    const setUserInvalid = useLoginPageStore((state) => state.setUserInvalid)
    const savedCred = useLoginPageStore((state) => state.savedCred)
    const setSavedCred = useLoginPageStore((state) => state.setSavedCred)

    const [activeTab, setActiveTab] = useState<string>("login")
    const [userExists, setUserExists] = useState<string>("")
    const [monkey, setMonkey] = useState<boolean>(false)

    const decryptPassword = (encryptedText: string) => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey)
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
    }

    const encryptPassword = (password: string) => {
        const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString()
        return encrypted
    }

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        setValue: setLoginValue,
        control: loginControl
    } = useForm<LoginFormData>({
        defaultValues: {
            rememberMe: savedCred?.rememberMe || false
        }
    })

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors },
        getValues: getSignupValues,
        reset: resetSignup
    } = useForm<SignupFormData>()

    const onLoginSubmit = (data: LoginFormData) => {
        const existingUsers = JSON.parse(localStorage.getItem("prime_cv_users") || "[]")
        const isUserValid = existingUsers.find((user: User) => (
            user.email.toLowerCase() === data.email.toLowerCase() && decryptPassword(user.password) === data.password
        ))
        if (!isUserValid) {
            setUserInvalid("Invalid credentials")
            return
        }
        login(isUserValid.email, isUserValid.password, data.rememberMe)
        router.push("/")
        setUserInvalid("")
    }

    const onSignupSubmit = (data: SignupFormData) => {
        const existingUsers = JSON.parse(localStorage.getItem("prime_cv_users") || "[]")
        const exists = existingUsers.some(
            (user: User) => user.email === data.email
        )
        if (exists) {
            setUserExists("User already exists with this email")
            return
        }
        const newUser = {
            email: data.email,
            password: encryptPassword(data.password)
        }
        existingUsers.push(newUser)
        localStorage.setItem("prime_cv_users", JSON.stringify(existingUsers))
        setUserExists("")
        resetSignup()
        window.location.reload()
    }

    useEffect(() => {
        const isCredSave = localStorage.getItem("prime_cv_save_cred") || "{}"
        const parsedSavedCred = JSON.parse(isCredSave)
        const isSaved = parsedSavedCred?.rememberMe || false
        setSavedCred(parsedSavedCred)
        if (isSaved === true) {
            setLoginValue("email", parsedSavedCred.email)
            setLoginValue("password", decryptPassword(parsedSavedCred.password))
            setLoginValue("rememberMe", parsedSavedCred.rememberMe)
        }
    }, [setSavedCred, setLoginValue])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 3, sm: 4 },
                boxSizing: "border-box",
                overflow: "hidden",
                mt:-2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: { xs: 2, sm: 3 },
                    px: { xs: 2.5, sm: 4, md: 5 },
                    py: { xs: 3, sm: 4, md: 5 },
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 420, md: 460 },
                    borderRadius: { xs: 3, sm: 4 },
                    border: "1px solid #2a2a2a",
                    boxSizing: "border-box"
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "24px", sm: "28px" },
                        fontWeight: "bold",
                        color: "primary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        letterSpacing: "-0.5px",
                        textAlign: "center"
                    }}
                    variant="h1"
                >
                    Prime CV
                </Typography>

                <Tabs.Root value={activeTab} onValueChange={setActiveTab} style={{ width: "100%" }}>
                    <Tabs.List
                        style={{
                            display: "flex",
                            marginBottom: "20px",
                            borderBottom: "1px solid #2a2a2a",
                            width: "100%"
                        }}
                    >
                        <Tabs.Trigger
                            value="login"
                            style={{
                                flex: 1,
                                padding: "10px",
                                background: "none",
                                border: "none",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: 600,
                                outline: "none"
                            }}
                            className="tab-trigger"
                        >
                            Login
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="signup"
                            style={{
                                flex: 1,
                                padding: "10px",
                                background: "none",
                                border: "none",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: 600,
                                outline: "none"
                            }}
                            className="tab-trigger"
                        >
                            Register
                        </Tabs.Trigger>
                    </Tabs.List>

                    <style jsx>{`
                :global(.tab-trigger[data-state='active']) {
                    color: primary !important;
                    border-bottom: 2px solid primary !important;
                }
            `}</style>

                    <Tabs.Content value="login" forceMount>
                        <AnimatedPanel active={activeTab === "login"}>
                            {userInvalid && (
                                <Typography
                                    sx={{
                                        color: "red",
                                        fontSize: "13px",
                                        textAlign: "center",
                                        mb: 2
                                    }}
                                >
                                    {userInvalid}
                                </Typography>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleLoginSubmit(onLoginSubmit)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2.5,
                                    width: "100%"
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Email address"
                                    type="email"
                                    error={!!loginErrors.email}
                                    helperText={loginErrors.email?.message}
                                    {...registerLogin("email", { required: "Email is required" })}
                                    sx={textFieldStyle}
                                />

                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    error={!!loginErrors.password}
                                    helperText={loginErrors.password?.message}
                                    {...registerLogin("password", { required: "Password is required" })}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => {
                                                            setShowPassword(!showPassword)
                                                            setMonkey(!monkey)
                                                        }}
                                                        sx={{ color: "primary" }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={textFieldStyle}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {xs: "row" },
                                        alignItems: { xs: "center" },
                                        justifyContent: "space-between",
                                        gap: 1,
                                        // width:{xs:"250px"}
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Controller
                                                name="rememberMe"
                                                control={loginControl}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={(e) => field.onChange(e.target.checked)}
                                                        sx={{
                                                            color: "#aaa",
                                                            "&.Mui-checked": { color: "#05ab32" }
                                                        }}
                                                    />
                                                )}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    color: "primary",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                Remember me
                                            </Typography>
                                        }
                                    />

                                    <Typography
                                        sx={{
                                            color: "primary",
                                            fontSize: "13px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Forgot password?
                                    </Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Sign in
                                </Button>
                            </Box>
                        </AnimatedPanel>
                    </Tabs.Content>

                    <Tabs.Content value="signup" forceMount>
                        <AnimatedPanel active={activeTab === "signup"}>
                            <Box
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    mb: 3
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: { xs: "18px", sm: "20px" },
                                        fontWeight: 600
                                    }}
                                >
                                    Great to see you here
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "black",
                                        fontSize: "13px",
                                        mt: 0.5
                                    }}
                                >
                                    Create your account and build your resume today
                                </Typography>
                            </Box>

                            {userExists && (
                                <Typography
                                    sx={{
                                        color: "red",
                                        fontSize: "13px",
                                        textAlign: "center",
                                        mb: 2
                                    }}
                                >
                                    {userExists}
                                </Typography>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleSignupSubmit(onSignupSubmit)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2.5,
                                    width: "100%"
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Email address"
                                    type="email"
                                    error={!!signupErrors.email}
                                    helperText={signupErrors.email?.message}
                                    {...registerSignup("email", { required: "Email is required" })}
                                    sx={textFieldStyle}
                                />

                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type="password"
                                    error={!!signupErrors.password}
                                    helperText={signupErrors.password?.message}
                                    {...registerSignup("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Min 6 chars"
                                        }
                                    })}
                                    sx={textFieldStyle}
                                />

                                <TextField
                                    fullWidth
                                    placeholder="Confirm your password"
                                    type="password"
                                    error={!!signupErrors.confirmPassword}
                                    helperText={signupErrors.confirmPassword?.message}
                                    {...registerSignup("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: (val) =>
                                            val === getSignupValues("password") ||
                                            "Passwords do not match"
                                    })}
                                    sx={textFieldStyle}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Create Account
                                </Button>
                            </Box>
                        </AnimatedPanel>
                    </Tabs.Content>
                </Tabs.Root>
            </Paper>
        </Box>
    )
}

const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
        color: "black",
        borderRadius: 2,
        background: "white",
        "& fieldset": { borderColor: "#2e2e2e" },
        "&:hover fieldset": { borderColor: "#3e3e3e" },
        "&.Mui-focused fieldset": { borderColor: "primary" },
    },
    "& .MuiInputBase-input::placeholder": { color: "#4a4a4a" },
    "& .MuiFormHelperText-root": { color: "#f48fb1", mx: 0 },
}

const buttonStyle = {
    mt: 0.5,
    py: 1.4,
    borderRadius: 2,
    fontSize: "15px",
    fontWeight: 600,
    textTransform: "none",
    background: "primary",
    boxShadow: "none",
    "&:hover": {
        background: "green",
        boxShadow: "none",
    },
    backgroundColor:"#05ab32",
    color:"white"
}

function AnimatedPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
    return (
        <Box
            sx={{
                transition: "all 1.0s ease",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                overflow: "hidden",
                transform: active
                    ? "rotateY(0deg) scale(1)"
                    : "rotateY(90deg) scale(1)",
                opacity: active ? 1 : 0,
                position: active ? "relative" : "absolute",
                p: 3,
            }}
        >
            {children}
        </Box>
    );
}