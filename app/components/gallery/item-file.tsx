export default function ItemFile({ content }) {
    return (
        <>
            <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer">
                <div className="block">
                    <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-gray-50">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="w-full h-full"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z"
                                    fill="#c3cdd5"
                                />
                                <path d="M821.333333 298.666667H618.666667V96z" fill="#e6ecef" />
                            </g>
                        </svg>

                    </div>
                    <div className="p-2 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="flex-1 text-base font-medium overflow-hidden text-ellipsis text-nowrap text-gray-900">
                                {content.name}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500"></p>
                    </div>
                </div>
            </div>
        </>
    )
}