'use client'

import { createContext, useContext, useState } from "react";
import SuccessToast from "../toasts/success-toast";


type ToastType = 'success' | 'warn' | 'error' | 'none';
type ToastData = { id: number; type: ToastType; message: string; }

const ToastContext = createContext<any>(undefined);

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }: {
    children: React.ReactNode
}) {
    const [toasts, setToasts] = useState<ToastData[]>([]);


    const addToast = (message: string, type: ToastType, duration: number = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts(toasts => toasts.filter(toast => toast.id !== id));
        }, duration);
    };


    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {
                toasts.length > 0 ?
                    <div className="fixed right-7 top-7 w-72">
                        <div className="flex flex-col gap-4">
                            {
                                toasts.map((toast, index) => {
                                    return (
                                        <SuccessToast key={index} message={toast.message} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    null
            }
        </ToastContext.Provider>
    )
}