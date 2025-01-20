'use client'

import { useEffect, useState } from "react"
import Avatar from "../avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [current, setCurrent] = useState<string>('');
    const pathname = usePathname();


    useEffect(() => {
        const routeSegments = pathname.split('/').filter(Boolean);
        if (routeSegments.length === 1) {
            setCurrent(routeSegments[0]);
        }
        else {
            setCurrent('');
        }
    }, [pathname]);

    return (
        <>
            <header className="md:hidden fixed right-0 top-0 left-64 flex items-center max-md:left-0 bg-white py-3 px-4 h-16 z-30">
                <nav onClick={() => setIsDrawerOpen(true)}>
                    <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6H6m12 4H6m12 4H6m12 4H6" />
                    </svg>
                </nav>
            </header>

            <div id="drawer-left-example" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? 'transform-none' : '-translate-x-full'} bg-white w-full max-w-96 dark:bg-gray-800`} tabIndex={1} aria-labelledby="drawer-left-label">
                {/* <h5 id="drawer-left-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>Left drawer</h5> */}
                <button
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="w-full mt-5 bg-white dark:bg-zinc-900">
                    <div className="flex items-center space-x-4 p-2 mb-5">
                        <Avatar name="Administrator" size={48} />
                        <div>
                            <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 capitalize font-poppins tracking-wide">
                                Administrator
                            </h4>
                            <span className="text-sm tracking-wide flex items-center space-x-1">
                                <svg
                                    className="h-4 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-50">Verified</span>
                            </span>
                        </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/dashboard"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline ${current === 'dashboard' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/interfaces"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline ${current === 'notifications' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                                    </svg>
                                </span>
                                <span>Interfaces</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/explorer"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline ${current === 'profile' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                    </svg>
                                </span>
                                <span>Explorer</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/database"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline ${current === 'preferences' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="text-lg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
                                    </svg>
                                </span>
                                <span>Database</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </span>
                                <span>Change password</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-500 focus:bg-gray-100 focus:shadow-outline`}
                            >
                                <span className="text-gray-600 dark:text-gray-50">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </span>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}