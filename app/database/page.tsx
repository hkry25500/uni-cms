'use client'

import { useEffect, useState } from "react";
import { MysqlColored, TableColored } from "../../components/svg/mysql";
import { JsonColored } from "../../components/svg/json";
import MysqlTable from "./mysql-table";


export default function Page() {
    const [sourceDropdown, setSourceDropdown] = useState(false);
    const [selectedSource, setSelectedSource] = useState<DataSource>('none');
    const [tableDropdown, setTableDropdown] = useState(false);
    const [tables, setTables] = useState<any[]>();
    const [selectedTable, setSelectedTable] = useState<string>();


    const handleSourceChange = (source: DataSource) => {
        setSelectedSource(source);
        setSourceDropdown(false);
    };

    const handleTableChange = (table: string) => {
        setSelectedTable(table);
        setTableDropdown(false);
    };


    useEffect(() => {
        if (!tables)
            fetch('/api/utils/db/showTables')
                .then(res => {
                    if (res.ok)
                        return res.json();
                })
                .then(tables => setTables(tables));
    }, []);


    return (
        <>
            <div className="relative px-6 py-8 min-h-screen sm:rounded-lg overflow-hidden">
                <div className="flex flex-col-reverse sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-0 pb-6">
                    <div className="inline-flex flex-col md:flex-row gap-4 max-md:w-80">
                        {/* Data Source Dropdown */}
                        <div>
                            {/* Dropdown button */}
                            <button
                                className="inline-flex justify-between items-center w-full md:w-[140px] h-10 cursor-pointer text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                                onClick={() => setSourceDropdown(prev => !prev)}
                            >
                                {
                                    selectedSource === 'json' ? <JsonColored className="w-5 h-5" /> :
                                        selectedSource === 'mysql' ? <MysqlColored className="w-5 h-5" /> :
                                            null
                                }
                                {
                                    selectedSource === 'json' ? 'JSON' :
                                        selectedSource === 'mysql' ? 'MySQL' :
                                            'Not selected'
                                }
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownRadio"
                                className={`${!sourceDropdown ? 'hidden ' : ''}absolute z-10 max-w-80 w-full md:w-[140px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                            >
                                <ul
                                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownRadioButton"
                                >
                                    <li>
                                        <div
                                            className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                            onClick={() => handleSourceChange('json')}
                                        >
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                checked={selectedSource === 'json'}
                                                readOnly
                                            />
                                            <label
                                                className="w-full ms-2 text-sm font-medium rounded cursor-pointer text-gray-900 dark:text-gray-300"
                                            >
                                                JSON
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                            onClick={() => handleSourceChange('mysql')}
                                        >
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                checked={selectedSource === 'mysql'}
                                                readOnly
                                            />
                                            <label
                                                className="w-full ms-2 text-sm font-medium rounded cursor-pointer text-gray-900 dark:text-gray-300"
                                            >
                                                MySQL
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Optional Table Dropdown */}
                        <div>
                            {/* Dropdown button */}
                            <button
                                className={`${(selectedSource !== 'mysql' ? 'hidden ' : '')}inline-flex justify-between items-center w-full md:w-[140px] h-10 cursor-pointer text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600`}
                                onClick={() => setTableDropdown(prev => !prev)}
                            >
                                <TableColored className="w-5 h-5" />
                                {selectedTable}
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdownRadio"
                                className={`${(!tableDropdown || selectedSource !== 'mysql') ? 'hidden ' : ''}absolute z-10 max-w-80 w-full md:w-[140px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                            >
                                <ul
                                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownRadioButton"
                                >
                                    {
                                        tables?.map((table, index) => {
                                            return (
                                                <li key={index}>
                                                    <div
                                                        className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                                        onClick={() => handleTableChange(table.name)}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                            checked={selectedTable === table.name}
                                                            readOnly
                                                        />
                                                        <label
                                                            className="w-full ms-2 text-sm font-medium rounded cursor-pointer text-gray-900 dark:text-gray-300"
                                                        >
                                                            { table.name }
                                                        </label>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Search input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                        />
                    </div>
                </div>
                {
                    !selectedTable ? null :
                    selectedSource === 'mysql' ? <MysqlTable table={selectedTable} /> :
                        <></>
                }
            </div>
        </>
    )
}