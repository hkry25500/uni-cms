'use client'

import { useState } from "react";
import { MysqlColored } from "../components/svg/mysql";
import { JsonColored } from "../components/svg/json";


export default function Page()
{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<DataSource>('none');


    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSource(event.target.value as DataSource);
    };


    return (
        <>
            <div className="relative px-6 py-8 overflow-x-auto sm:rounded-lg">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div>
                        {/* Dropdown button */}
                        <button
                            className="inline-flex justify-between items-center w-[140px] h-10 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                            onClick={() => setDropdownOpen(prev => !prev)}
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
                            className={`${!dropdownOpen?'hidden ':''}absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                        >
                            <ul
                                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownRadioButton"
                            >
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="radio-option-json"
                                            type="radio"
                                            value={'json'}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={handleSourceChange}
                                            checked={selectedSource === 'json'}
                                        />
                                        <label
                                            htmlFor="radio-option-json"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            json
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="radio-option-mysql"
                                            type="radio"
                                            value={'mysql'}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={handleSourceChange}
                                            checked={selectedSource === 'mysql'}
                                        />
                                        <label
                                            htmlFor="radio-option-mysql"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            mysql
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-2"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-2" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">White</td>
                            <td className="px-6 py-4">Laptop PC</td>
                            <td className="px-6 py-4">$1999</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">Black</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$99</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Apple Watch
                            </th>
                            <td className="px-6 py-4">Black</td>
                            <td className="px-6 py-4">Watches</td>
                            <td className="px-6 py-4">$199</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Apple iMac
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">PC</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Apple AirPods
                            </th>
                            <td className="px-6 py-4">White</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$399</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                iPad Pro
                            </th>
                            <td className="px-6 py-4">Gold</td>
                            <td className="px-6 py-4">Tablet</td>
                            <td className="px-6 py-4">$699</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Magic Keyboard
                            </th>
                            <td className="px-6 py-4">Black</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$99</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Smart Folio iPad Air
                            </th>
                            <td className="px-6 py-4">Blue</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$79</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-3" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                AirTag
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Accessories</td>
                            <td className="px-6 py-4">$29</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                4
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                5
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}