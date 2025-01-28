'use client'

import React, { useState } from 'react'


export default function Page() {
    const [sortByDropdown, setSortByDropdown] = useState(false);


    return (
        <>
            <div className="mt-5">
                <div>
                    <button
                        className="flex flex-row justify-between items-center w-48 px-1.5 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none"
                        onClick={() => setSortByDropdown(prev => !prev)}
                    >
                        <span className="select-none text-sm ms-2">Sort by</span>
                        <svg
                            id="arrow-down"
                            className="hidden w-6 h-6 stroke-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <svg
                            id="arrow-up"
                            className="w-6 h-6 stroke-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div
                        className={`${sortByDropdown ? '' : 'hidden '}absolute z-50 w-48 py-2 mt-2 text-sm bg-white rounded-lg shadow-sm`}
                    >
                        <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                        >
                            Popularity
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                        >
                            Downloads
                        </a>
                    </div>
                    <div className={`${sortByDropdown ? '' : 'hidden '}fixed inset-0 z-40`} onClick={() => setSortByDropdown(false)}></div>
                </div>
            </div>

            <div className="grid xl:grid-cols-2 2xl:grid-cols-3 mt-10 gap-6">
                <div className="flex flex-col w-full shadow-md rounded-lg aspect-w-16 aspect-h-10 bg-white cursor-pointer">
                    <div className="flex flex-col ms-4 mt-4">
                        <img
                            src="https://pngimg.com/uploads/minecraft/minecraft_PNG74.png"
                            className='w-14 h-14'
                        />
                        <h3 className='mt-4 text-lg font-semibold font-mono'>Minecraft server</h3>
                        <p className='text-sm overflow-hidden text-ellipsis text-nowrap text-gray-500'>A uniCMS extension to host Minecraft server</p>
                    </div>
                    <div className="flex justify-end items-end">
                        <button
                            type="button"
                            className="me-4 mb-4 px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            <svg
                                className="w-4 h-4 me-2 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Install
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
