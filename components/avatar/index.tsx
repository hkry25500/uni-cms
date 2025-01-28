'use client'

import { extractInitials } from "@/lib/util/string";


export default function Avatar({ name, base64, size }: {
    name?: string,
    base64?: string,
    size: number,
})
{
    const style = {
        width: `${size}px`,
        height: `${size}px`,
    };

    return (
        <>
            {
                base64 ? <img style={style} className="rounded-full overflow-hidden" src={`data:image/png;base64,${base64}`} /> :
                name ?
                <div style={style} className="relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                    <span className="font-medium select-none text-gray-600 dark:text-gray-300">{ extractInitials(name) }</span>
                </div>
                :
                <></>
            }
        </>
    )
}