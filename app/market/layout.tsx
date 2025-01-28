'use client'

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";


export default function Layout({ children }) {
    const segment = useSelectedLayoutSegment();
    const [selectedTab, setSelectedTab] = useState<string>('plugins');


    useEffect(() => {
        setSelectedTab(segment as string);
    }, [segment]);


    return (
        <>
            <div className="min-h-screen bg-neutral-50">
                <div className="h-screen p-4 md:px-20 md:py-10">

                    <div>
                        <h1 className="text-3xl font-semibold">Marketplace</h1>
                        <p className="mt-2 text-base text-gray-500">Download extension plugin for uniCMS</p>
                    </div>

                    <div className="mt-10">
                        <div className="text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
                            <ul className="flex -mb-px">
                                <li className="md:me-2">
                                    <Link
                                        href="plugins"
                                        className={selectedTab === 'plugins' ? "inline-block p-4 w-24 md:w-32 rounded-t-lg text-xs font-semibold uppercase text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 w-24 md:w-32 text-xs font-semibold uppercase border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
                                        onClick={() => setSelectedTab('plugins')}
                                    >
                                        Plugins
                                    </Link>
                                </li>
                                <li className="md:me-2">
                                    <Link
                                        href="providers"
                                        className={selectedTab === 'providers' ? "inline-block p-4 w-24 md:w-32 rounded-t-lg text-xs font-semibold uppercase text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 w-24 md:w-32 text-xs font-semibold uppercase border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
                                        onClick={() => setSelectedTab('providers')}
                                    >
                                        Providers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {
                        children
                    }

                </div>
            </div>
        </>
    )
}