'use client'

import ItemIMDb from "@/components/gallery/item-imdb";
import ItemFolder from "@/components/gallery/item-folder";
import { useEffect, useRef, useState } from "react";
import ItemInEdit from "@/components/gallery/item-in-edit";
import ItemFile from "@/components/gallery/item-file";
import NavToTop from "@/components/buttons/nav-to-top";


export default function ExplorerPage({ dirpath }: any) {
    const [contents, setContents] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState(dirpath);
    const [pathSegments, setPathSegments] = useState<string[]>();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isVisible: boolean }>({ x: 0, y: 0, isVisible: false });
    const [inEditing, setInEditing] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const scrollArea = useRef<HTMLDivElement>(null);


    useEffect(() => {
        fetchContents(dirpath);
    }, []);

    useEffect(() => {
        if (currentPath) {
            fetch(`/api/path/relative?from=${dirpath}&to=${currentPath}`)
                .then(res => res.json())
                .then(result => {
                    setPathSegments(result.split(/[/\\]+/).filter(Boolean));
                });
        }
    }, [currentPath]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Backspace' && pathSegments && pathSegments.length > 0) {
                fetch(`/api/path/join/${dirpath}/${pathSegments.slice(0, pathSegments.length - 1).join('/')}`)
                    .then(res => {
                        if (res.ok)
                            return res.json();
                    })
                    .then(path => {
                        handleDirectoryChange(path);
                    });
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pathSegments]);


    async function fetchContents(_dirpath: string) {
        try {
            const response = await fetch('/api/util/io/fetchDir?args_0=' + _dirpath);
            const data = await response.json();
            setContents(data);
        } catch (error) {
            setContents([]);
        }
    }

    const handleDirectoryChange = (_dirpath: string) => {
        fetchContents(_dirpath);
        setCurrentPath(_dirpath);
    }

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, isVisible: false }));
    };

    const handleRefresh = () => fetchContents(currentPath);

    const handleNewFolder = () => setInEditing(true);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        console.log(e.currentTarget.scrollTop)
        setScrollTop(e.currentTarget.scrollTop);
    }

    const scrollToTop = () => {
        if (scrollArea && scrollArea.current)
            scrollArea.current.scrollTop = 0;
    }


    return (
        <>
            <div
                ref={scrollArea}
                className="h-screen px-6 py-6 bg-neutral-50 overflow-y-scroll"
                onContextMenu={handleRightClick}
                onScroll={onScroll}
            >

                <nav className="flex w-full px-5 py-3 text-gray-800 border border-gray-100 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li
                            className="inline-flex items-center cursor-pointer"
                            onClick={() => handleDirectoryChange(dirpath)}
                        >
                            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd" />
                                </svg>
                                root
                            </span>
                        </li>
                        {
                            pathSegments?.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            const relativePath = pathSegments.slice(0, index + 1).join('/');
                                            fetch(`/api/path/join/${dirpath}/${relativePath}`)
                                                .then(res => res.json())
                                                .then(path => handleDirectoryChange(path))
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <span className="ms-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-yellow-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                                {item}
                                            </span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </nav>

                <div className="lg:max-w-screen-2xl xl:max-w-full lg:mx-auto mt-5 md:mt-10 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center overflow-hidden">
                    {
                        contents.map((content: any) => {
                            if (content.type === 'directory') {
                                return (
                                    <ItemFolder
                                        key={content.name}
                                        content={content}
                                        onClick={() => handleDirectoryChange(content.path)}
                                        onRefresh={handleRefresh}
                                    />
                                )
                            }
                            else if (content.type === 'file') {
                                return (
                                    <ItemFile
                                        key={content.name}
                                        content={content}
                                        onClick={() => undefined}
                                        onRefresh={handleRefresh}
                                    />
                                )
                            }
                            else if (content.type === 'imdb') {
                                return (
                                    <ItemIMDb
                                        key={content.name}
                                        content={content}
                                        onClick={() => handleDirectoryChange(content.path)}
                                    />
                                )
                            }
                        })
                    }
                    {
                        inEditing ?
                            <>
                                <ItemInEdit
                                    defaultValue="New Folder"
                                    onEnter={(str) => {
                                        setInEditing(false);
                                        fetch(`/api/path/join/${currentPath}/${str}`)
                                            .then(res => {
                                                if (res.ok)
                                                    return res.json();
                                                else
                                                    return;
                                            })
                                            .then(path => {
                                                fetch(`/api/fs/mkdir?path=${path}`)
                                                    .then(_res => {
                                                        handleRefresh();
                                                    });
                                            });
                                    }}
                                    onCancel={() => {
                                        setInEditing(false);
                                    }}
                                />
                            </>
                            :
                            null
                    }
                </div>

                <NavToTop scrollTop={scrollTop} scrollToTop={scrollToTop} />

                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    isVisible={contextMenu.isVisible}
                    onClose={closeContextMenu}
                    onRefresh={handleRefresh}
                    onNewFolder={handleNewFolder}
                />

            </div>
        </>
    )
}


function ContextMenu({ x, y, isVisible, onClose, onRefresh, onNewFolder }: {
    x: number;
    y: number;
    isVisible: boolean;
    onClose: () => void;
    onRefresh: () => void;
    onNewFolder: () => void;
}) {
    const [isCreateSubMenuOpen, setIsCreateSubMenuOpen] = useState(false);
    const [isMouseStillOnSubMenu, setIsMouseStillOnSubMenu] = useState(false);

    useEffect(() => {
        if (!isMouseStillOnSubMenu)
            setIsCreateSubMenuOpen(false);
    }, [isMouseStillOnSubMenu]);

    const handleOnClose = () => {
        setIsCreateSubMenuOpen(false);
        onClose();
    }

    return (
        <>
            {/* 透明遮罩层 */}
            <div className={`${!isVisible ? 'hidden ' : ''}fixed inset-0 z-40`} onClick={handleOnClose}></div>
            <div
                className={`${!isVisible ? 'hidden ' : ''}absolute z-50 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200`}
                style={{
                    left: x,
                    top: y
                }}
            >
                <nav className="relative flex w-[200px] flex-col gap-1 p-1.5">
                    <div
                        role="button"
                        className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onClick={() => {
                            handleOnClose();
                            onRefresh();
                        }}
                    >
                        Refresh
                        <div className="ml-auto grid place-items-center justify-self-end">
                            <div
                                className="p-2 text-center text-sm transition-all text-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div
                        role="button"
                        className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onMouseEnter={() => setIsCreateSubMenuOpen(true)}
                    >
                        Create
                        <div className="ml-auto grid place-items-center justify-self-end">
                            <div
                                className="p-2 text-center text-sm transition-all text-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <svg
                                    className="w-4 h-4 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="m9 5 7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div
                            className={`${!isCreateSubMenuOpen ? 'hidden ' : ''}absolute translate-x-[205px] left-auto bottom-0 right-0 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200`}
                            onMouseEnter={() => setIsMouseStillOnSubMenu(true)}
                            onMouseLeave={() => setIsMouseStillOnSubMenu(false)}
                        >
                            <nav className="relative flex w-[200px] flex-col gap-1 p-1.5">
                                <div
                                    role="button"
                                    className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                    onClick={() => {
                                        handleOnClose();
                                        onNewFolder();
                                    }}
                                >
                                    New Folder...
                                    <div className="ml-auto grid place-items-center justify-self-end">
                                        <div
                                            className="p-2 text-center text-sm transition-all text-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
