'use client'

import ToastProvider from "@/components/providers/toast-provider"
import Header from "../components/header"
import Sidebar from "../components/sidebar"


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastProvider>
                <div className="flex flex-row min-h-screen">
                    <Header />
                    <Sidebar />
                    <main className="w-full pt-16 md:pt-0 min-h-screen">
                        {children}
                    </main>
                </div>
            </ToastProvider>
        </>
    )
}