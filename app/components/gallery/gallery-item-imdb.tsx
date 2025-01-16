'use client'

import { useEffect, useState } from "react";


export default function GalleryItemIMDb({ content }: {
    content: any
})
{
    const [movie, setMovie] = useState<any>();

    useEffect(() => {
        fetchMovie();
    }, []);

    async function fetchMovie() {
        try {
            const movie = await (await fetch(`/movies/${content.name}`)).json();
            setMovie(movie);
        } catch (error) {
            setMovie(undefined);
        }
    }


    if (!movie) return <></>;

    return (
        <div className="block relative transition hover:scale-105 hover:-rotate-1 w-full max-w-[324px]">
            <a href="#" target="_blank" className="block">
                <div className="aspect-w-16 aspect-h-9 rounded-xl border shadow overflow-hidden bg-gray-100">
                    <img
                        src={ movie.poster.url }
                        loading="lazy"
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="p-2 space-y-1">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="flex-1 text-base font-medium text-gray-900">
                            { movie.title }
                        </h3>
                        <span className="mt-1 shrink-0 text-xs inline-flex items-center gap-1">
                            { movie.rating }
                            <svg className="w-3 h-3 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                            {/* <svg
                                className="w-3 h-3 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                                />
                            </svg> */}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">{ movie.director }</p>
                </div>
            </a>
        </div>
    )
}