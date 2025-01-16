'use client'

import { extractInitials } from "@/lib/util/string";


export default function Avatar({ name, base64, size }: {
    name?: string,
    base64?: string,
    size: number,
})
{
    const style = `w-${size} h-${size}`;

    return (
        <>
            {
                base64 ? <img className={`${style} rounded-full overflow-hidden`} src={`data:image/png;base64,${base64}`} /> :
                name
                ?
                <div className={`${style} relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600`}>
                    <span className="font-medium select-none text-gray-600 dark:text-gray-300">{ extractInitials(name) }</span>
                </div>
                :
                <></>
            }
        </>
    )
}