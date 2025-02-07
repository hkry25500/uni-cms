'use client'

import { ChangeEvent, useEffect, useState } from "react";
import Avatar from "../../components/avatar";
import { maskPassword, truncateWithEllipsis } from "@/lib/util/string";
import copy from "copy-to-clipboard";
import { useToast } from "@/components/providers/toast-provider";


export default function MysqlTable({ table, exportBtn }: {
    table: string;
    exportBtn: any
}) {
    return (
        <div>
            {
                table === 'users' ? <UsersTable /> :
                    // Default
                    <Table table={table} exportBtn={exportBtn} />
            }

        </div>
    )
}


function Table({ table, exportBtn }) {
    const [columns, setColumns] = useState<any[]>();
    const [rows, setRows] = useState<any[]>();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>({});
    const { addToast } = useToast();


    useEffect(() => {
        if (table)
            fetch(`/api/utils/db/showColumnsFrom?args_0=${table}`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(columns => setColumns(columns));
    }, [table]);

    useEffect(() => {
        if (table)
            fetch(`/api/utils/db/selectFrom?args_0=${table}`)
                .then(res => {
                    if (res.ok)
                        return res.json();
                    else
                        return [];
                })
                .then(rows => setRows(rows));
    }, [table]);

    useEffect(() => {
        if (rows) {
            for (let i = 0; i < rows.length; i++) {
                setSelectedRows(prev => ({ ...prev, [i]: false }));
            }
        }
    }, [rows]);

    useEffect(() => {
        if (rows) {
            if (selectAll === true) {
                for (let i = 0; i < rows.length; i++) {
                    setSelectedRows(prev => ({ ...prev, [i]: true }));
                }
            }
            else if (selectAll === false) {
                for (let i = 0; i < rows.length; i++) {
                    setSelectedRows(prev => ({ ...prev, [i]: false }));
                }
            }
        }
    }, [selectAll]);

    useEffect(() => {
        if (exportBtn && exportBtn.current) {
            exportBtn.current.addEventListener('click', copyToClipboard);
        }

        return () => {
            if (exportBtn && exportBtn.current) {
                exportBtn.current.removeEventListener('click', copyToClipboard);
            }
        }
    }, [exportBtn, rows, selectedRows]);


    function copyToClipboard(_e: MouseEvent) {
        if (rows) {
            console.log(selectedRows)
            const objectArray = Object.keys(selectedRows);
            let selectedRowsArray: any[] = [];
            for (let i = 0; i < objectArray.length; i++) {
                const value = selectedRows[i];
                if (value === true) {
                    selectedRowsArray.push(rows[i]);
                }
                else
                    continue;
            }

            copy(JSON.stringify(selectedRowsArray, null, 4)); console.log(selectedRowsArray)

            addToast("Copied to clipboard", 'success', 3000);
        }
    }


    return (
        <>
            <div className="relative h-[50vh] xl:h-[65vh] 2xl:h-[70vh] overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-neutral-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                                        checked={selectAll}
                                        onChange={e => setSelectAll(e.target.checked)}
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="p-4">
                            </th>
                            {
                                columns?.map((col, index) => {
                                    if (index < 8)
                                    return (
                                        <th key={index} scope="col" className="px-6 py-4">
                                            {col.Field}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows?.map((row, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                                    checked={selectedRows[index] || false}
                                                    onChange={e => setSelectedRows(prev => ({ ...prev, [index]: e.target.checked }))} />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="w-4 h-4 text-center text-gray-950">
                                            {index + 1}
                                        </td>
                                        {
                                            Object.values(row).map((item: any, index: number) => {
                                                if (index < 8)
                                                return (
                                                    <td key={index} className="px-6 py-4">{truncateWithEllipsis(typeof item === 'string' ? item : item.toString(), columns?.length! > 7 ? 15 : 20)}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


function UsersTable() {
    const [usersTableCols, setUsersTableCols] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isEditModalShow, setEditModal] = useState<boolean>(false);
    const [userEditing, setUserEditing] = useState<any | null>();


    useEffect(() => {
        fetch('/api/utils/db/getUsersTableColumns')
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    return [];
            })
            .then(cols => setUsersTableCols(cols));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length === 0) {
            const interval = setInterval(() => {
                fetchUsers();
            }, 2500);
            return () => clearInterval(interval); // 清除定时器
        }
    }, [users]);


    function fetchUsers() {
        fetch('/api/utils/db/getUsers')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else
                    return [];
            })
            .then(users => setUsers(users))
    }

    function handleUserUpdate(user: any) {
        setEditModal(true);
        setUserEditing(user);
    }

    function cancelUserUpdate() {
        setEditModal(false);
        setUserEditing(null);
    }

    function submitUserUpdate() {
        const formatObj = { ...userEditing };
        delete formatObj.avatar;
        fetch(`/api/utils/db/updateUser?args_0=${userEditing.uid}&args_1=${JSON.stringify(formatObj)}`)
            .finally(() => {
                setEditModal(false);
                setUserEditing(null);
                fetchUsers();
            });
    }


    if (usersTableCols.length > 0 && users.length > 0)
        return (
            <>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-neutral-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            {
                                usersTableCols.map((col: string, index: number) => {
                                    return (
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {col}
                                        </th>
                                    )
                                })
                            }
                            <th scope="col" className="px-3 py-3 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: any, index: number) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.uid}
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <Avatar name={user.name} base64={user.avatar} size={40} />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{user.name}</div>
                                                <div className="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {truncateWithEllipsis(user.name, 20)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {maskPassword(user.password, 15)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {truncateWithEllipsis(user.avatar, 30)}
                                        </td>

                                        {/* Default */}
                                        <td className="px-3 py-4">
                                            <div className="flex justify-center items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>Verified
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-center">
                                            <a
                                                role="button"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => handleUserUpdate(user)}
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {/* Main modal */}
                {
                    isEditModalShow && userEditing ?
                        <div
                            className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center w-full md:inset-0 md:h-full"
                        >
                            <div className="fixed inset-0 bg-black opacity-50" onClick={() => cancelUserUpdate()}></div>
                            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                                {/* Modal content */}
                                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                    {/* Modal header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {`${userEditing.name}'s Profile`}
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            onClick={() => cancelUserUpdate()}
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* Modal body */}
                                    <form>
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    defaultValue={userEditing.name}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEditing((prev: any) => ({ ...prev, name: e.target.value }))}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                                                    placeholder="Ex. Apple iMac 27“"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    defaultValue={userEditing.email}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEditing((prev: any) => ({ ...prev, email: e.target.value }))}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                                                    placeholder="Ex. Apple"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    defaultValue={userEditing.password}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEditing((prev: any) => ({ ...prev, password: e.target.value }))}
                                                    name="password"
                                                    id="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label
                                                    htmlFor="category"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    id="category"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                    defaultValue='member'
                                                >
                                                    <option value="visitor">Visitor</option>
                                                    <option value="member">Member</option>
                                                    <option value="premium">Premium</option>
                                                    <option value="prime">Prime</option>
                                                    <option value="special">Special Member</option>
                                                </select>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label
                                                    htmlFor="description"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows={5}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                                                    placeholder="Not available"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                type="button"
                                                className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                                                onClick={() => submitUserUpdate()}
                                            >
                                                Update product
                                            </button>
                                            <button
                                                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                onClick={() => cancelUserUpdate()}
                                            >
                                                <svg
                                                    className="mr-1 -ml-1 w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </>
        )
    // else
    //     return <SkeletonTable />
}


function MoviesTable() {
    const [moviesTableCols, setMoviesTableCols] = useState<string[]>([]);
    const [movies, setMovies] = useState<any[]>([]);


    useEffect(() => {
        fetch('/api/utils/db/getMoviesTableColumns')
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    return [];
            })
            .then(cols => setMoviesTableCols(cols));
    }, []);

    useEffect(() => {
        fetch('/api/utils/db/getMovies')
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    return [];
            })
            .then(movies => setMovies(movies));
    }, []);


    if (moviesTableCols.length > 0 && movies.length > 0)
        return (
            <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-neutral-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                {
                                    moviesTableCols.map((col: any, index: number) => {
                                        return (
                                            <th key={index} scope="col" className="px-6 py-3">
                                                {col}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie: any, index: number) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <img
                                                    src={movie.poster ? movie.poster : null}
                                                    className="w-16 md:w-32 max-w-full max-h-full"
                                                    loading='lazy'
                                                />
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {movie.id}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {truncateWithEllipsis(movie.title, 32)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                                {movie.type}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {movie.rating}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {movie.classification}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {truncateWithEllipsis(movie.description, 32)}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {movie.casts}
                                            </td>
                                            <td className="px-6 py-3 text-gray-900 dark:text-white">
                                                {movie.director}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
}


function SkeletonTable() {
    return (
        <>
            <div className="py-6 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></div>
            <div
                role="status"
                className="w-full space-y-5 rounded border-gray-200 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700"
            >
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between pt-5 animate-pulse">
                            <div>
                                <div className="w-2/3 h-2.5 mb-2.5 bg-gray-300 rounded-full dark:bg-gray-600" />
                                <div className="w-96 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                            </div>
                            <div className="w-12 h-2.5 bg-gray-300 rounded-full dark:bg-gray-700" />
                        </div>
                    ))
                }
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}