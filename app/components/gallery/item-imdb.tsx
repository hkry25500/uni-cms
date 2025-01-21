'use client'

import { useEffect, useState } from "react";


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

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, isVisible: true });
    };

    const closeContextMenu = () => {
        setContextMenu(prev => ({ ...prev, isVisible: false }));
    };


    if (!movie) return <></>;

    return (
        <>
            <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px] cursor-pointer" onContextMenu={handleRightClick} onClick={onClick}>
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
                            <h3 className="flex-1 text-base font-medium text-gray-900">
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
            <ContextMenu x={contextMenu.x} y={contextMenu.y} isVisible={contextMenu.isVisible} onClose={closeContextMenu} />
        </>
    )
}


function ContextMenu({ x, y, isVisible, onClose }: {
    x: number;
    y: number;
    isVisible: boolean;
    onClose: () => void
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
                    >
                        Edit...
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