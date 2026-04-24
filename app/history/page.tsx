import HistoryClient from './HistoryClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Prime CV-History"
}

export default function History() {
    return (
        <div suppressHydrationWarning>
            <HistoryClient />
        </div>
    )
}