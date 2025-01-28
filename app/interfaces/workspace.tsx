'use client'

import { useEffect, useState } from "react";
import { TableColored } from "../../components/svg/mysql"
import { DateValueBadge, EnumValueBadge, NumberValueBadge, TextValueBadge } from "../../components/badges";


export default function Workspace() {

    const [tables, setTables] = useState<any[]>();
    const [selectedTable, setSelectedTable] = useState<string>();
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
        if (!tables)
            fetch('/api/utils/db/showTables')
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(tables => setTables(tables));
    }, []);

    useEffect(() => {
        if (selectedTable) {
            fetch(`/api/utils/db/showColumnsFrom?args_0=${selectedTable}`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(res => setWorkspaceTableCols(res));
        }
    }, [selectedTable]);


    return (
        <>
            <div className="grid grid-cols-4 xl:gap-x-10">
                <div className="lg:col-span-1 max-lg:hidden">
                    <div
                        className="flex-shrink-0 w-full h-full bg-white border-r-2 border-indigo-100"
                    >
                        <nav
                            aria-label="Main"
                            className="flex flex-col h-full"
                        >
                            {/* Links */}
                            <div className="flex-1 pr-4 space-y-2 overflow-hidden hover:overflow-auto">
                                {
                                    tables?.map((table, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`${selectedTable === table.name ? 'flex items-center w-full space-x-2 cursor-pointer text-sm font-semibold text-yellow-900 bg-yellow-200 rounded-lg' : 'flex items-center space-x-2 cursor-pointer text-sm font-semibold text-yellow-900 transition-colors rounded-lg group hover:bg-yellow-100'}`}
                                                onClick={() => setSelectedTable(table.name)}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`${selectedTable === table.name ? 'p-2 bg-yellow-400 rounded-lg' : 'p-2 rounded-lg transition-colors group-hover:bg-yellow-300'}`}
                                                >
                                                    <TableColored className="w-6 h-6" />
                                                </span>
                                                <span>/{table.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="lg:col-span-1 max-lg:hidden">
                    <div
                        className="w-full h-full bg-white border-r-2 border-indigo-100"
                    >
                        <nav
                            aria-label="Main"
                            className="flex flex-col h-full"
                        >
                            {/* Links */}
                            <div className="flex-1 pr-4 space-y-2 overflow-hidden hover:overflow-auto">
                                {
                                    http_methods.map(method => {
                                        return (
                                            <div
                                                key={method.name}
                                                className="flex items-center space-x-2 cursor-pointer text-sm font-semibold transition-colors rounded-lg text-gray-900 hover:bg-gray-50"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="p-2"
                                                >
                                                    <svg
                                                        className="w-6 h-6"
                                                        viewBox="0 0 32 32"
                                                        id="icon"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                        <g id="SVGRepo_iconCarrier">
                                                            <defs>
                                                                <style dangerouslySetInnerHTML={{ __html: ".cls-1{fill:none;}" }} />
                                                            </defs>
                                                            <title>HTTP</title>
                                                            <path
                                                                d="M30,11H25V21h2V18h3a2.0027,2.0027,0,0,0,2-2V13A2.0023,2.0023,0,0,0,30,11Zm-3,5V13h3l.001,3Z"
                                                                transform="translate(0 0)"
                                                            />
                                                            <polygon points="10 13 12 13 12 21 14 21 14 13 16 13 16 11 10 11 10 13" />
                                                            <polygon points="23 11 17 11 17 13 19 13 19 21 21 21 21 13 23 13 23 11" />
                                                            <polygon points="6 11 6 15 3 15 3 11 1 11 1 21 3 21 3 17 6 17 6 21 8 21 8 11 6 11" />
                                                            <rect
                                                                id="_Transparent_Rectangle_"
                                                                data-name="<Transparent Rectangle>"
                                                                className="cls-1"
                                                                width={32}
                                                                height={32}
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                                <span className={`text-sm font-extrabold ${method.color}`}>{method.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-span-4 lg:col-span-2 flex flex-col items-center gap-6 h-[70vh] overflow-y-scroll">
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