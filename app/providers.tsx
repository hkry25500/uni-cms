'use client'

import ToastProvider from "@/components/providers/toast-provider"
import Header from "../components/header"
import Sidebar from "../components/sidebar"


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastProvider>
                <div className="flex flex-row w-screen h-screen overflow-x-auto overflow-y-hidden xl:overflow-hidden">
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