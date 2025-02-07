import React from 'react'


export default function Page() {
    return (
        <>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mt-10 gap-x-6 gap-y-20">

                <PluginCard name="Minecraft" description="A uniCMS extension to host Minecraft server" icon="https://pngimg.com/uploads/minecraft/minecraft_PNG74.png" />

            </div>
        </>
    )
}


function PluginCard({ name, description, icon }) {
    return (
        <>
            <div className="flex flex-col min-w-96 max-w-[460px] shadow-md rounded-lg aspect-w-16 aspect-h-9 bg-white border border-gray-100 cursor-pointer">
                <div className="flex flex-col ms-4 mt-4">
                    <img
                        src={icon}
                        className='w-14 h-14'
                    />
                    <h3 className='mt-4 text-lg font-semibold font-mono'>{name}</h3>
                    <p className='mt-2 text-sm overflow-hidden text-ellipsis text-nowrap text-gray-500'>{description}</p>
                </div>
                <div className="flex justify-end items-end">
                    <button
                        type="button"
                        className="me-4 mb-4 px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:outline-none rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700"
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
                        Uninstall
                    </button>

                </div>
            </div>
        </>
    )
}
