import React, { createContext, useState } from "react";

interface IToastContext {
    toast: (message: string) => void,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    message: string,    
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const ToastContext = createContext<IToastContext>({
    toast: (message: string) => {},
    open: false,
    setOpen: () => {},
    message: "",
    setMessage: () => {}
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const toast = (mssg: string) => {
        setOpen(true);
        setMessage(mssg);
        setTimeout(() => {
            setOpen(false);
            setMessage("");
        }, 5000);
    }

    return (
        <ToastContext.Provider value={{ open, setOpen, message, setMessage, toast }}>
            {children}
        </ToastContext.Provider>
    )
}



