export function TextValueBadge() {
    return (
        <span className="bg-green-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            <svg
                className="w-6 h-6 mx-1 fill-current text-green-800"
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path d="M86.85742,50.89062a11.99923,11.99923,0,0,0-21.71484,0l-64,136a11.99956,11.99956,0,0,0,21.71484,10.21876L38.43848,164h75.123l15.58106,33.10938a11.99956,11.99956,0,0,0,21.71484-10.21876ZM49.73291,140,76,84.18262,102.26709,140ZM204,90.90039a46.5134,46.5134,0,0,0-26.89746,8.32129,11.99992,11.99992,0,0,0,13.78711,19.64453A22.96251,22.96251,0,0,1,204,114.90039c11.02832,0,20,7.17773,20,16v1.37891A48.30971,48.30971,0,0,0,204,128c-24.26172,0-44,17.49512-44,39s19.73828,39,44,39a47.94743,47.94743,0,0,0,23.1875-5.87549A11.98692,11.98692,0,0,0,248,192V130.90039C248,108.84473,228.26172,90.90039,204,90.90039ZM204,182c-10.84082,0-20-6.86914-20-15s9.15918-15,20-15,20,6.86914,20,15S214.84082,182,204,182Z" />{" "}
                </g>
            </svg>
        </span>
    )
}

export function NumberValueBadge() {
    return (
        <span className="bg-blue-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-400">
            <svg
                className="w-6 h-6 mx-1 fill-current text-blue-800"
                fill="#1e40af"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.0165 17.6336H3.83636V16.4336H21.0165V17.6336Z"
                    />{" "}
                    <path
                        d="M7.09808 13.3967V7.50803H5.74066L3.83636 8.78244V10.091L5.65277 8.88498H5.74066V13.3967H3.84125V14.5539H8.89984V13.3967H7.09808Z"
                    />{" "}
                    <path
                        d="M9.81781 9.63205V9.66135H11.1069V9.62717C11.1069 8.95334 11.5756 8.49435 12.2739 8.49435C12.9575 8.49435 13.4018 8.89474 13.4018 9.5051C13.4018 9.97873 13.1528 10.3498 12.1909 11.3117L9.89594 13.5822V14.5539H14.8618V13.3869H11.7807V13.299L13.1577 11.9856C14.3491 10.843 14.7543 10.1838 14.7543 9.41232C14.7543 8.19162 13.7729 7.36642 12.3178 7.36642C10.8383 7.36642 9.81781 8.28439 9.81781 9.63205Z"
                    />{" "}
                    <path
                        d="M17.6694 11.4631H18.5092C19.3198 11.4631 19.8422 11.8684 19.8422 12.4983C19.8422 13.1184 19.3295 13.5139 18.5239 13.5139C17.767 13.5139 17.2592 13.133 17.2104 12.5324H15.9262C15.9897 13.8508 17.0248 14.6955 18.5629 14.6955C20.1401 14.6955 21.2192 13.841 21.2192 12.591C21.2192 11.6584 20.6528 11.0334 19.7006 10.9211V10.8332C20.4721 10.677 20.9457 10.0666 20.9457 9.23654C20.9457 8.12326 19.9741 7.36642 18.5434 7.36642C17.0541 7.36642 16.1118 8.17697 16.0629 9.50021H17.2983C17.3422 8.8801 17.8061 8.48459 18.4995 8.48459C19.2075 8.48459 19.6567 8.85568 19.6567 9.44162C19.6567 10.0324 19.1977 10.4182 18.4946 10.4182H17.6694V11.4631Z"
                    />{" "}
                </g>
            </svg>
        </span>
    )
}

export function EnumValueBadge() {
    return (
        <span className="bg-yellow-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-yellow-400">
            <svg
                className="w-6 h-6 mx-1 fill-current text-yellow-800"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 3l1-1h6l1 1v5l-1 1h-4V8h4V3H8v3H7V3zm2 6V8L8 7H2L1 8v5l1 1h6l1-1V9zM8 8v5H2V8h6zm1.414-1L9 6.586V6h4v1H9.414zM9 4h4v1H9V4zm-2 6H3v1h4v-1z"
                    />
                </g>
            </svg>
        </span>
    )
}

export function DateValueBadge() {
    return (
        <span className="bg-purple-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-purple-400">
            <svg
                className="w-6 h-6 mx-1 fill-current text-purple-800"
                viewBox="-3 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path d="M11.882 3.187a.476.476 0 0 1 .475.475v11.063a.476.476 0 0 1-.475.475H1.118a.476.476 0 0 1-.475-.475V3.662a.476.476 0 0 1 .475-.475h1.328v.721a1.425 1.425 0 0 0 2.85 0v-.72H7.71v.72a1.425 1.425 0 0 0 2.85 0v-.72zm-.634 3.37H1.752v7.535h9.496zm-7.384.821H2.621V8.67h1.243zm0 2.292H2.621v1.292h1.243zm0 2.292H2.621v1.291h1.243zm.561-8.054V2.475a.554.554 0 1 0-1.108 0v1.433a.554.554 0 1 0 1.108 0zm1.613 3.47H4.794V8.67h1.244zm0 2.292H4.794v1.292h1.244zm0 2.292H4.794v1.291h1.244zm2.174-4.584H6.968V8.67h1.244zm0 2.292H6.968v1.292h1.244zm0 2.292H6.968v1.291h1.244zm1.477-8.054V2.475a.554.554 0 0 0-1.108 0v1.433a.554.554 0 0 0 1.108 0zm.696 3.47H9.142V8.67h1.243zm0 2.292H9.142v1.292h1.243zm0 2.292H9.142v1.291h1.243z" />
                </g>
            </svg>
        </span>
    )
}
