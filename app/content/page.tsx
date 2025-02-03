'use client'

import { withUpperCase } from "@/lib/util/string";
import { useEffect, useState } from "react";
import Workspace from "./workspace";


export default function Page() {
    const [tables, setTables] = useState<any[]>();
    const [selectedTable, setSelectedTable] = useState<string>();


    useEffect(() => {
        if (!tables)
            fetch('/api/utils/db/showTables')
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(tables => setTables(tables));
    }, []);


    return (
        <>
            <div className="min-h-screen grid grid-cols-5 bg-neutral-50">

                <div className="max-md:hidden md:col-span-1">
                    <div
                        className="flex-shrink-0 w-full h-full border-r-2 border-indigo-100"
                    >
                        <div className="h-20 p-6">
                            <h2 className="text-xl font-semibold text-neutral-800">Collections</h2>
                        </div>
                        <nav
                            aria-label="Main"
                            className="flex flex-col h-full"
                        >
                            {/* Links */}
                            <div className="flex-1 overflow-hidden hover:overflow-auto">
                                {
                                    tables?.map((table, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`${selectedTable === table.name ? 'flex items-center p-4 w-full space-x-2 cursor-pointer text-sm font-semibold text-yellow-500 bg-neutral-100 border-r-2 border-yellow-500' : 'flex items-center p-4 space-x-2 cursor-pointer text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100'}`}
                                                onClick={() => setSelectedTable(table.name)}
                                            >
                                                <span className="ms-4"><span className="me-3">•</span>{withUpperCase(table.name)}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="col-span-4 md:col-span-4 p-6 md:px-20 md:py-10">
                    {
                        !selectedTable ? null :
                            <>
                                <div
                                    className="inline-flex flex-row items-center gap-1.5 -ml-2 px-4 py-2 text-yellow-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                                    onClick={() => setSelectedTable(undefined)}
                                >
                                    <svg
                                        className="w-6 h-6 text-yellow-600"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                                        />
                                    </svg>
                                    Back
                                </div>
                                <div className="mt-5">
                                    <h1 className="text-3xl font-semibold">Content</h1>
                                    <p className="mt-2 text-base text-gray-500">Start developing by adding new API Collections into workspace</p>
                                </div>
                                <Workspace table={selectedTable} />
                            </>
                    }
                </div>

            </div>
        </>
    )
}