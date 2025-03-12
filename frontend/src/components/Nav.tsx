import { User } from "lucide-react";

const Nav = () => {
    return (
        <div className="sticky top-0 flex justify-between w-[80%] mx-auto my-2">
            <h1 className="sm:text-2xl text-xl font-bold italic">Coupon_Distribution</h1>
            <div className="flex justify-center items-center">
                <User />
                <b className="text-lg mx-2">Guest</b>
            </div>
        </div>
    )
}

export default Nav;