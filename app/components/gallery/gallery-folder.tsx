import { useState } from "react";
import GalleryItemInEdit from "./gallery-in-edit";


export default function GalleryFolder({ content, onClick, onRefresh }: {
    content: any;
    onClick: () => void;
    onRefresh: () => void;
}) {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isVisible: boolean }>({ x: 0, y: 0, isVisible: false });
    const [inEditing, setInEditing] = useState(false);
    // const [contentEditing, setContentEditing] = useState<string>();


    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, isVisible: false }));
    };

    const handleRename = () => {
        setInEditing(true);
    }

    const handleDelete = () => {
        closeContextMenu();
        fetch(`/api/fs/remove?dir=${content.path}`)
            .then(res => {
                if (res.ok)
                    onRefresh();
            });
    };


    return (
        <>
            {
                !inEditing ?
                    <>
                        <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer" onClick={onClick} onContextMenu={handleRightClick}>
                            <div className="block">
                                <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-gray-50">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                        <path fill="#ffa000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h29.7L44,29V16C44,13.8,42.2,12,40,12z"></path><path fill="#ffca28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                                    </svg>
                                </div>
                                <div className="p-2 space-y-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="flex-1 text-base font-medium text-gray-900">
                                            {content.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500"></p>
                                </div>
                            </div>
                        </div>
                        <ContextMenu
                            x={contextMenu.x}
                            y={contextMenu.y}
                            isVisible={contextMenu.isVisible}
                            onClose={closeContextMenu}
                            onRename={handleRename}
                            onDelete={handleDelete}
                        />
                    </>
                    :
                    <GalleryItemInEdit
                        defaultValue={content.name}
                        onEnter={(str: string) => {
                            setInEditing(false);
                            if (str) {
                                closeContextMenu();
                                const newSegments: string[] = content.path.split(/[/\\]+/).filter(Boolean);
                                newSegments.pop();
                                newSegments.push(str);
                                const newPath = newSegments.join('/');
                                console.log(newPath)
                                fetch(`/api/fs/rename?oldPath=${content.path}&newPath=${newPath}`)
                                    .then(res => {
                                        if (res.ok)
                                            onRefresh();
                                    })
                            }
                        }}
                        onCancel={() => {
                            setInEditing(false);
                        }}
                    />
            }

        </>
    )
}


function ContextMenu({ x, y, isVisible, onClose, onRename, onDelete }: {
    x: number;
    y: number;
    isVisible: boolean;
    onClose: () => void;
    onRename: () => void;
    onDelete: () => void;
}) {
    return (
        <>
            {/* 透明遮罩层 */}
            <div className={`${!isVisible ? 'hidden ' : ''}fixed inset-0 z-40`} onClick={onClose}></div>
            <div
                className={`${!isVisible ? 'hidden ' : ''}absolute z-50 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200`}
                style={{
                    left: x,
                    top: y
                }}
            >
                <nav className="flex min-w-[200px] flex-col gap-1 p-1.5">
                    <div
                        role="button"
                        className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onClick={onRename}
                    >
                        Rename...
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
                        onClick={() => {
                            onClose();
                            onDelete();
                        }}
                    >
                        Delete
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
                                    <path
                                        fillRule="evenodd"
                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
