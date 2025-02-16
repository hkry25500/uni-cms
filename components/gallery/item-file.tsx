'use client'

import { useState } from "react";
import ItemInEdit from "./item-in-edit";
import { JsonFileColored, TextFileColored, UnknownFileColored } from "../svg/file-types";
import ContextMenu from "../context-menu";


export default function ItemFile({ content, onClick, onRefresh }: {
    content: any;
    onClick: () => void;
    onRefresh: () => void;
}) {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isVisible: boolean }>({ x: 0, y: 0, isVisible: false });
    const [inEditing, setInEditing] = useState(false);


    const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => setContextMenu(prev => ({ ...prev, isVisible: false }));

    const handleInteract = () => {
        closeContextMenu();
        onClick();
    };

    const handleRename = () => {
        closeContextMenu();
        setInEditing(true);
    };

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
                        <div
                            className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer"
                            onContextMenu={openContextMenu}
                        >
                            <div className="block">
                                <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-white">
                                    {
                                        (content.ext === 'txt' || content.ext === 'vtt') ? <TextFileColored /> :
                                            (content.ext === 'json' || content.ext === 'js') ? <JsonFileColored /> :
                                                <UnknownFileColored />
                                    }
                                </div>
                                <div className="p-2 space-y-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="flex-1 text-base font-medium overflow-hidden text-ellipsis text-nowrap text-gray-900">
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
                            visible={contextMenu.isVisible}
                            items={[
                                {
                                    label: "Open",
                                    action: handleInteract
                                },
                                {
                                    label: "Rename...",
                                    action: handleRename
                                },
                                {
                                    label: "Delete",
                                    action: handleDelete,
                                    icon: (
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
                                    )
                                }
                            ]}
                            onClose={closeContextMenu}
                        />
                    </>
                    :
                    <ItemInEdit
                        type="file"
                        defaultValue={content.name}
                        onEnter={(str: string) => {
                            setInEditing(false);
                            if (str) {
                                const newSegments: string[] = content.path.split(/[/\\]+/).filter(Boolean);
                                newSegments.pop();
                                newSegments.push(str);
                                const newPath = newSegments.join('/');
                                console.log(newPath)
                                fetch(`/api/fs/rename?oldPath=${content.path}&newPath=${newPath}`)
                                    .then(res => {
                                        if (res.ok)
                                            onRefresh();
                                    });
                            }
                        }}
                        onCancel={() => setInEditing(false)}
                    />
            }
        </>
    )
}
