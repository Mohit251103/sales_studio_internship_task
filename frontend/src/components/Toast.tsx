import { useContext } from "react";
import { ToastContext } from "../context/toastContext";
import { X } from "lucide-react";

const Toast = () => {
    const { message, setOpen } = useContext(ToastContext);
    const closeToast = () => {
        setOpen(false);
    }
    return (
        <div className="absolute bottom-2 right-5 w-[70%] sm:w-fit sm:max-w-[70%] transition-all duration-500 text-xs sm:text-sm p-2 rounded-md bg-black bg-opacity-70 border-black text-white mx-auto flex justify-center items-center">
            {message}
            <button className="bg-none w-fit h-fit" onClick={closeToast}>
                <X className="mx-2 w-5 h-5" />
            </button>
        </div>
    )
}

export default Toast;