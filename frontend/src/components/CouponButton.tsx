import { useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ToastContext } from "../context/toastContext";


const CouponButton = () => {

    const { toast } = useContext(ToastContext);
    const [coupon, setCoupon] = useState<string>("");

    const handleClick = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/get-coupon");
            toast(res.data.message);
            setCoupon(res.data.coupon.code);
        } catch (error: any) {
            toast(error.response.data.message);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <h1 className="text-lg mb-4">Click the button to get the token</h1>
            <div className="flex justify-center items-center">
                <input type="text" value={coupon} placeholder="Coupon will appear here" className="text-sm p-3 sm:text-md sm:p-4 bg-white text-black border-black border-1 rounded-sm mx-2" disabled={true} />
                <button className="bg-black text-sm p-3 sm:text-md sm:p-4 border border-white text-white rounded-sm hover:cursor-pointer hover:scale-105 transition  duration-200" onClick={handleClick}>
                    Get Coupon
                </button>
            </div>
        </div>
    )
}

export default CouponButton;

