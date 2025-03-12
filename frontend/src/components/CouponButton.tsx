import { useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ToastContext } from "../context/toastContext";


const CouponButton = () => {

    const { toast } = useContext(ToastContext);
    const handleClick = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/get-coupon");
            toast(res.data.message);
        } catch (error: any) {
            console.log(error);
            toast(error.response.data.message);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <h1 className="text-lg mb-4">Click the button to get the token</h1>
            <button className="bg-black text-md border border-white text-white p-4 rounded-sm hover:cursor-pointer hover:scale-105 transition  duration-200" onClick={handleClick}>
                Get Coupon
            </button>
        </div>
    )
}

export default CouponButton;

