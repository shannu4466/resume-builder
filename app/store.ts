import { create } from "zustand";

type LoginPageStore = {
    showPassword: boolean;
    userInvalid: string;
    savedCred: {
        email: string;
        password: string;
        rememberMe: boolean;
    } | null;
    setShowPassword: (value: boolean) => void;
    setUserInvalid: (value: string) => void;
    setSavedCred: (data: { email: string; password: string; rememberMe: boolean } | null) => void;
}

export const useLoginPageStore = create<LoginPageStore>((set) => ({
    showPassword: false,
    userInvalid: "",
    savedCred: null,
    setShowPassword: (value) => set({ showPassword: value }),
    setUserInvalid: (value) => set({ userInvalid: value }),
    setSavedCred: (data) => set({ savedCred: data }),
}))