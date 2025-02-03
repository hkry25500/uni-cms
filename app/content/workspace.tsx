'use client'

import { useEffect, useState } from "react";
import { DateValueBadge, EnumValueBadge, NumberValueBadge, TextValueBadge } from "../../components/badges";


export default function Workspace({ table }) {
    const [workspaceTableCols, setWorkspaceTableCols] = useState<any[]>();
    const http_methods = [
        { name: 'GET', color: 'text-green-700' },
        { name: 'POST', color: 'text-yellow-700' },
        { name: 'PUT', color: 'text-orange-700' },
        { name: 'DELETE', color: 'text-red-700' },
        // { name: 'PATCH', color: 'text-purple-700' },
        { name: 'OPTIONS', color: 'text-gray-700' },
        // { name: 'HEAD', color: 'text-orange-700' }
    ];


    useEffect(() => {
        if (table) {
            fetch(`/api/utils/db/showColumnsFrom?args_0=${table}`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(res => setWorkspaceTableCols(res));
        }
    }, [table]);


    return (
        <>
            <div className="mt-10">
                <div className="flex flex-col items-center gap-6 h-[60vh] md:h-[70vh] overflow-y-scroll">
                    {
                        workspaceTableCols?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-6 w-full h-20 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                >
                                    {
                                        (item.Type.includes('char') || item.Type.includes('text')) ? <TextValueBadge /> :
                                            (item.Type.includes('int') || item.Type.includes('float')) ? <NumberValueBadge /> :
                                                (item.Type.includes('enum')) ? <EnumValueBadge /> :
                                                    (item.Type.includes('date')) ? <DateValueBadge /> :
                                                        null
                                    }
                                    <span className="text-base font-medium">{item.Field}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}