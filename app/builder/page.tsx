import BuilderClient from './BuilderClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Prime CV-Build resume"
}

export default function Builder() {
    return (
        <div suppressHydrationWarning>
            <BuilderClient />
        </div>
    )
}