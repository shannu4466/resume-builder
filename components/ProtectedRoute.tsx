"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const guestOnlyRoutes = ["/login", "/signup"];
const publicRoutes = ["/"];

export default function ProtectedRoute({ children, }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isGuestOnly = guestOnlyRoutes.includes(pathname);
    const isPublic = publicRoutes.includes(pathname);

    useEffect(() => {
        if (!loading && !user && !isPublic && !isGuestOnly) {
            router.replace("/login");
        }
        if (!loading && user && isGuestOnly) {
            router.replace("/");
        }
    }, [user, loading, pathname, router, isPublic, isGuestOnly]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-6 h-6 border-2 border-black border-t-white rounded-full animate-spin" />
            </div>
        );
    }
    if (!user && !isPublic && !isGuestOnly) return null;
    return <>{children}</>;
}