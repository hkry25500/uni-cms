import { useEffect, useState } from "react";


export default function NavToTop({ scrollTop, scrollToTop }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (scrollTop > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [scrollTop]);


    return (
        <>
            {
                isVisible ?
                    <button
                        type="button"
                        className="fixed right-5 bottom-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => scrollToTop()}
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v13m0-13 4 4m-4-4-4 4"
                            />
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                    :
                    null
            }
        </>
    )
}