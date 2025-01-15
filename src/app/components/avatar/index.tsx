'use client'

import { extractInitials } from "@/lib/util/string"
import { Session } from "next-auth"


export default function Avatar({ status, data, size }: {
    status: "authenticated" | "loading" | "unauthenticated",
    data: Session | any,
    size: number,
})
{
    const style = `w-${size} h-${size}`;

    return (
        <>
            {
                status==='authenticated' ?
                    data.user.avatar ?
                    <img
                        className={`${style} rounded-full overflow-hidden`}
                        src={`data:image/png;base64,${data.user.avatar}`}
                        />
                    :
                    <div
                        className={`${style} relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600`}
                        >
                        <span className="font-medium select-none text-gray-600 dark:text-gray-300">{ extractInitials(data.user.name) }</span>
                    </div>
                :
                <>
                    <div
                        className={`${style} relative rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600`}
                        onClick={() => location.href = '/auth/signin'}
                        >
                        <svg className={`w-12 h-12 absolute text-gray-400 -left-1`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                </>
            }
        </>
    )
}