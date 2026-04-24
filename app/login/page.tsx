import LoginClient from './LoginClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Prime CV-Login"
}

export default function Login() {
    return (
        <div suppressHydrationWarning>
            <LoginClient />
        </div>
    )
}