import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Database",
    description: ""
}

export default function DatabaseLayout({ children }: { children: React.ReactNode })
{
    return (
        <>
            { children }
        </>
    )
}