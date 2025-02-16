'use client'

import ItemIMDb from "@/components/gallery/item-imdb";
import ItemFolder from "@/components/gallery/item-folder";
import { useEffect, useRef, useState } from "react";
import ItemInEdit from "@/components/gallery/item-in-edit";
import ItemFile from "@/components/gallery/item-file";
import NavToTop from "@/components/buttons/nav-to-top";
import ContextMenu from "@/components/context-menu";


export default function ExplorerPage({ dirpath }: any) {
    const [contents, setContents] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState(dirpath);
    const [pathSegments, setPathSegments] = useState<string[]>();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isVisible: boolean }>({ x: 0, y: 0, isVisible: false });
    const [isFolderEditing, setIsFolderEditing] = useState(false);
    const [isFileEditing, setIsFileEditing] = useState(false);
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

    const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => setContextMenu(prev => ({ ...prev, isVisible: false }));

    const handleRefresh = () => fetchContents(currentPath);

    const handleNewFile = () => {
        closeContextMenu();
        setIsFileEditing(true);
    };

    const handleNewFolder = () => {
        closeContextMenu();
        setIsFolderEditing(true);
    };

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
                onContextMenu={showContextMenu}
                onScroll={onScroll}
            >

                <nav className="flex w-full px-5 py-3 text-gray-800 border border-gray-100 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li
                            className="inline-flex items-center cursor-pointer"
                            onClick={() => handleDirectoryChange(dirpath)}
                        >
                            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                                            <span className="ms-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
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
                        isFolderEditing ?
                            <>
                                <ItemInEdit
                                    type='folder'
                                    defaultValue="New Folder"
                                    onEnter={(str) => {
                                        setIsFolderEditing(false);
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
                                        setIsFolderEditing(false);
                                    }}
                                />
                            </>
                            :
                            null
                    }
                    {
                        isFileEditing ?
                            <>
                                <ItemInEdit
                                    type='file'
                                    defaultValue="New File"
                                    onEnter={(str) => {
                                        setIsFileEditing(false);
                                        fetch(`/api/path/join/${currentPath}/${str}`)
                                            .then(res => {
                                                if (res.ok)
                                                    return res.json();
                                                else
                                                    return;
                                            })
                                            .then(path => {
                                                fetch(`/api/fs/ensurefile?path=${path}`)
                                                    .then(_res => {
                                                        handleRefresh();
                                                    });
                                            });
                                    }}
                                    onCancel={() => {
                                        setIsFileEditing(false);
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
                    visible={contextMenu.isVisible}
                    items={[
                        {
                            label: "Refresh",
                            action: handleRefresh
                        },
                        {
                            label: "Create",
                            children: [
                                {
                                    label: "New File...",
                                    action: handleNewFile
                                },
                                {
                                    label: "New Folder...",
                                    action: handleNewFolder
                                }
                            ]
                        }
                    ]}
                    onClose={closeContextMenu}
                />

            </div>
        </>
    )
}
