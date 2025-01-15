'use client'

import GalleryItemIMDb from "../components/gallery/gallery-item-imdb";
import GalleryFolder from "../components/gallery/gallery-folder";
import { useEffect, useState } from "react";


export default function ContentPage({ dirpath }: any)
{
    const [contents, setContents] = useState<any[]>([]);
    const [current, setCurrent] = useState(dirpath);
    const [relativeCurrent, setRelativeCurrent] = useState<string[]>();


    useEffect(() => {
        fetchContents(dirpath);
    }, []);

    useEffect(() => {
        if (current) {
            fetch(`/api/path/relative?from=${dirpath}&to=${current}`)
            .then(res => res.json())
            .then(result => {
                setRelativeCurrent(result.split(/[/\\]+/).filter(Boolean));
            });
        }
    }, [current]);


    async function fetchContents(_dirpath: string) {
        try {
            const response = await fetch('/api/utils/io/fetchDir?args_0=' + _dirpath);
            const data = await response.json();
            setContents(data);
        } catch (error) {
            setContents([]);
        }
    }

    function handleDirectoryChange(_dirpath: string) {
        fetchContents(_dirpath);
        setCurrent(_dirpath);
    }


    return (
        <>
            <div className="px-6 py-6">

                <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li
                            className="inline-flex items-center cursor-pointer"
                            onClick={() => handleDirectoryChange(dirpath)}
                        >
                            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd"/>
                                </svg>
                                Content
                            </span>
                        </li>
                        {
                            relativeCurrent?.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            const var_1 = relativeCurrent.slice(0, index + 1).join('/');
                                            fetch(`/api/path/join/${dirpath}/${var_1}`)
                                            .then(res => res.json())
                                            .then(path => handleDirectoryChange(path))
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                            </svg>
                                            <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                                { item }
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>

                <div className="max-w-screen-2xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {
                        contents.map((content: any) => {
                            if (content.type === 'directory') {
                                return <GalleryFolder key={content.name} name={content.name} onClick={() => handleDirectoryChange(content.path)} />
                            }
                            else if (content.type === 'imdb') {
                                return <GalleryItemIMDb key={content.name} content={content} />
                            }
                        })
                    }
                </div>

            </div>
        </>
    )
}