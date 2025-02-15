import { useEffect, useState } from "react";


interface MenuItem {
    label: string;
    action?: () => void;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

export default function ContextMenu({ x, y, visible, items, onClose }: {
    x: number;
    y: number;
    visible: boolean;
    items: MenuItem[]
    onClose: () => void;
}) {
    return (
        <>
            {/* 透明遮罩层 */}
            <div className={`${!visible ? 'hidden ' : ''}fixed inset-0 z-40`} onClick={onClose}></div>
            <div
                className={`${!visible ? 'hidden ' : ''}absolute z-50 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200`}
                style={{
                    left: x,
                    top: y
                }}
            >
                <nav className="relative flex w-[200px] flex-col gap-1 p-1.5">
                    {
                        items.map((item, index) => {
                            return (
                                <ContextMenuItem key={index} index={index} item={item} />
                            )
                        })
                    }
                </nav>
            </div>
        </>
    )
}


function ContextMenuItem({ index, item }: {
    index: number;
    item: MenuItem
}) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (!isMouseHover) {
            // 设置一个 2 秒的定时器
            timeoutId = setTimeout(() => {
                setIsSubmenuOpen(false);
            }, 200);
        }
        // 清理定时器
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isMouseHover]); // 依赖 isMouseHover 的变化

    return (
        <>
            {
                item.children && item.children.length > 0 ?
                    <div
                        role="button"
                        className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onMouseEnter={() => setIsSubmenuOpen(true)}
                    >
                        {item.label}
                        <div className="ml-auto grid place-items-center justify-self-end">
                            <div
                                className="p-2 text-center text-sm transition-all text-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <svg
                                    className="w-4 h-4 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
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
                        {
                            item.children && item.children.length > 0 && (
                                <SubMenu index={index} visible={isSubmenuOpen} items={item.children} invokeMouseHover={setIsMouseHover} />
                            )
                        }
                    </div>
                    :
                    <div
                        role="button"
                        className="flex w-full pl-3 items-center rounded-md transition-all text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onClick={item.action}
                    >
                        {item.label}
                        <div className="ml-auto grid place-items-center justify-self-end">
                            <div
                                className="p-2 text-center text-sm transition-all text-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                {
                                    item.icon ?
                                        item.icon
                                        :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                        </svg>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}


function SubMenu({ index, visible, items, invokeMouseHover }: {
    index: number;
    visible: boolean;
    items: MenuItem[];
    invokeMouseHover: (on: boolean) => void;
}) {
    const count = index + 1;
    const unit = (12 + (count * 32) + ((count - 1) * 4)) / count;
    const pixelFromTop = `${index * unit}px`;

    return (
        <>
            <div
                style={{ top: pixelFromTop }}
                className={`${!visible ? 'hidden ' : ''}absolute z-50 translate-x-[204px] left-auto right-0 flex flex-col rounded-lg bg-white shadow-sm border border-slate-200`}
                onMouseEnter={() => invokeMouseHover(true)}
                onMouseLeave={() => invokeMouseHover(false)}
            >
                <nav className="relative flex w-[200px] flex-col gap-1 p-1.5">
                    {
                        items.map((item, index) => {
                            return (
                                <ContextMenuItem key={index} index={index} item={item} />
                            )
                        })
                    }
                </nav>
            </div>
        </>
    )
}
