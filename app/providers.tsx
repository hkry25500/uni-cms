'use client'

import ToastProvider from "@/components/providers/toast-provider"
import Header from "../components/header"
import Sidebar from "../components/sidebar"


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastProvider>
                <Header />
                <Sidebar />
                <main className="ml-0 md:ml-64 pt-16 md:pt-0 min-h-screen">
                    {children}
                </main>
            </ToastProvider>
        </>
    )
}