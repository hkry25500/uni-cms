'use client'

import Header from "./components/header"
import Sidebar from "./components/sidebar"


export default function Providers({ children }: { children: React.ReactNode })
{
    return (
        <>
            <Header />
            <Sidebar />
            <main className="ml-64 max-md:ml-0 pt-16 max-h-screen overflow-auto">
                { children }
            </main>
        </>
    )
}