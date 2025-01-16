

export default function GalleryFolder({ name, onClick }: {
    name: string,
    onClick?: () => void
})
{
    return (
        <>
            <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer" onClick={onClick}>
                <div className="block">
                    <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-gray-100">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#ffa000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h29.7L44,29V16C44,13.8,42.2,12,40,12z"></path><path fill="#ffca28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                        </svg>
                    </div>
                    <div className="p-2 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="flex-1 text-base font-medium text-gray-900">
                                { name }
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500"></p>
                    </div>
                </div>
            </div>
        </>
    )
}