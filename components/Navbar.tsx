"use client";

import { useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/context/AuthContext";
import logo from '../public/prime_cv_logo_with_background-removebg-preview.png'
import Image from 'next/image'

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const { user, logout } = useAuth()

    const userEmail = user?.email
    const userName = userEmail?.split("@")[0]

    const extractedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : "Guest"

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Templates", path: "/templates" },
        { label: "History", path: "/history" },
        { label: `${user ? "Logout" : "Login"}`, path: "/login" },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "#ffffff",
                    borderBottom: "1px solid #e5e7eb",
                    color: "#111827",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml:-4 }}>
                                <Image src={logo} alt="logo" width={100} height={50} style={{ marginRight: -30 }} />
                                <Typography
                                    variant="h6"
                                    sx={{ letterSpacing: 0.5, fontWeight: "bold" }}
                                >
                                    Prime CV
                                </Typography>
                            </Box>
                        </Link>
                        {/* Desktop */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    href={item.path}
                                    sx={{
                                        color: "#374151",
                                        fontWeight: 500,
                                        textTransform: "none",
                                    }}
                                    onClick={() => {
                                        if (item.label === 'Logout') {
                                            logout()
                                        }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}

                            <Button
                                variant="contained"
                                component={Link}
                                href="/builder"
                                sx={{
                                    ml: 1,
                                    textTransform: "none",
                                    borderRadius: "10px",
                                    px: 3,
                                }}
                            >
                                Build Resume
                            </Button>
                        </Box>

                        {/* Mobile */}
                        <IconButton
                            sx={{ display: { xs: "flex", md: "none" } }}
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 260 }} role="presentation">
                    <List>
                        <Typography component="h4" sx={{ fontWeight: "bold", ml: 2 }}>Welcome {extractedUserName} !</Typography>
                        {navItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={item.path}
                                    onClick={() => {
                                        setOpen(false)
                                        if (item.label === 'Logout') {
                                            logout()
                                        }
                                    }}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <ListItem sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                component={Link}
                                href="/builder"
                                onClick={() => setOpen(false)}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "10px",
                                }}
                            >
                                Build Resume
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}