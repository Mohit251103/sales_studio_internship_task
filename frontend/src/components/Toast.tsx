import { useContext } from "react";
import { ToastContext } from "../context/toastContext";

const Toast = () => {
    const { message } = useContext(ToastContext);
    return (
        <div className="absolute top-10 sm:left-[35%] w-[70%] text-xs sm:text-sm sm:w-fit p-2 rounded-md bg-black bg-opacity-70 border-black text-white">
            {message}
        </div>
    )
}

export default Toast;