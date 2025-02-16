'use client'

import { useEffect, useState } from "react";
import ContextMenu from "../context-menu";


export default function ItemIMDb({ content, onClick }: {
    content: any;
    onClick: () => void;
}) {
    const [movie, setMovie] = useState<any>();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isVisible: boolean }>({ x: 0, y: 0, isVisible: false });


    useEffect(() => {
        fetchMovie();
    }, []);


    function fetchMovie() {
        fetch(`/movies/${content.name}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else
                    return undefined;
            })
            .then(movie => setMovie(movie));
    }

    const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, isVisible: false }));
    };

    const handleInteract = () => {
        closeContextMenu();
        onClick();
    };


    if (!movie) return <></>;

    return (
        <>
            <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer" onContextMenu={showContextMenu} onClick={onClick}>
                <div className="block">
                    <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-gray-100">
                        <img
                            src={movie.poster.url}
                            loading="lazy"
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div className="p-2 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="flex-1 text-base font-medium overflow-hidden text-ellipsis text-nowrap text-gray-900">
                                {movie.title}
                            </h3>
                            <span className="mt-1 shrink-0 text-xs inline-flex items-center gap-1">
                                {movie.rating}
                                <svg className="w-3 h-3 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{movie.director}</p>
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
                    }
                ]}
                onClose={closeContextMenu} />
        </>
    )
}
