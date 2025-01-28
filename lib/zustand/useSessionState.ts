import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useSessionState = create(
    persist(
        (set) => ({
            value: null,
            setValue: (value: any) => set({ value }),
            clearValue: () => set({ value: null }),
        }),
        {
            name: 'session-state',
            storage: {
                getItem: (name) => {
                    const item = sessionStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                }
            }
        }
    )
);