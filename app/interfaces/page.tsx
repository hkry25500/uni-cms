import { Metadata } from "next"
import Workspace from "./workspace"


export const metadata: Metadata = {
    title: "Interfaces"
}

export default function Page() {
    return (
        <>
            <div className="min-h-screen px-6 py-8 bg-yellow-50">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="rounded-3xl p-10 mb-5 shadow-md bg-white">

                        <h1 className="text-3xl font-bold">
                            Interfaces
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <div className="text-base text-gray-500">
                                    Start developing by adding new API Collections into workspace.
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        className="bi bi-chat-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                                >
                                    Open
                                </button>
                            </div>
                        </div>

                        <hr className="mt-5 mb-10" />

                        <Workspace />

                    </div>
                </div>
            </div>
        </>
    )
}