import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Database",
    description: ""
}

export default function DatabaseLayout({ children }: { children: React.ReactNode })
{
    return (
        <>
            <div className="min-h-screen bg-neutral-50">
                <div className="h-screen p-4 md:px-20 md:py-10">

                    <div>
                        <h1 className="text-3xl font-semibold">Database</h1>
                        <p className="mt-2 text-base text-gray-500">Database visualization with CRUD functionality</p>
                    </div>

                    {
                        children
                    }

                </div>
            </div>
        </>
    )
}