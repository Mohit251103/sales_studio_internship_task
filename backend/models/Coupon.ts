import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;