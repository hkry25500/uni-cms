'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const unselectedStyle = "flex bg-white hover:bg-yellow-50 rounded-xl font-semibold text-sm text-gray-900 py-3 px-4";
const selectedStyle = "flex bg-yellow-200 rounded-xl font-semibold text-sm text-yellow-900 py-3 px-4";

export default function Sidebar()
{
    const [current, setCurrent] = useState<string>('');
    const pathname = usePathname();


    useEffect(() => {
        const routeSegments = pathname.split('/').filter(Boolean);
        if (routeSegments.length === 1)
        {
            setCurrent(routeSegments[0]);
        }
        else
        {
            setCurrent('');
        }
    },[pathname]);

    return (
        <>
            <aside className="fixed inset-y-0 left-0 bg-white shadow-md h-screen w-64 max-md:hidden">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex-grow">
                        <div className="px-4 py-6 text-center border-b">
                            <h1 className="text-xl font-bold leading-none">
                                <span className="text-yellow-700">uni</span>CMS
                            </h1>
                        </div>
                        <div className="p-2 mt-2">
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className={current === 'dashboard' ? selectedStyle : unselectedStyle}
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg mr-4"
                                        viewBox="0 0 16 16"
                                        >
                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/interfaces"
                                        className={current === 'interfaces' ? selectedStyle : unselectedStyle}
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg mr-4"
                                        viewBox="0 0 16 16"
                                        >
                                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                                        </svg>
                                        Interfaces
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/explorer"
                                        className={current === 'explorer' ? selectedStyle : unselectedStyle}
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg mr-4"
                                        viewBox="0 0 16 16"
                                        >
                                            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                        </svg>
                                        Explorer
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/database"
                                        className={current === 'database' ? selectedStyle : unselectedStyle}
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width='1em'
                                        height='1em'
                                        fill="currentColor"
                                        className="text-lg mr-4"
                                        viewBox="0 0 24 24"
                                        >
                                            <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
                                        </svg>
                                        Database
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pricing"
                                        className={current === 'pricing' ? selectedStyle : unselectedStyle}
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="text-lg mr-4"
                                        viewBox="0 0 16 16"
                                        >
                                            <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        </svg>
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white hover:bg-yellow-50 rounded-2xl font-bold text-sm text-gray-900 m-1 py-3 px-4 cursor-pointer">
                        <button
                        type="button"
                        className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                className=""
                                viewBox="0 0 16 16"
                            >
                                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                        </button>
                        <span className="font-bold text-sm ml-4">Logout</span>
                    </div>
                </div>
            </aside>
        </>
    )
}