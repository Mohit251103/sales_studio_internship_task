import { v4 as uuidv4 } from "uuid";
import Coupon from "../models/Coupon";
import Counter from "../models/Counter";
import ClaimHistory from "../models/ClaimHistory";
import { Request, Response } from "express";

const COOLDOWN_PERIOD = 60 * 1000;

const getCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const userIp = req.clientIp;
        let sessionId = req.cookies.session_id;
        const now = Date.now();

        if (sessionId) {
            res.status(429).json({ message: "You have already claimed a coupon. Try again later!" });
            return;
        }

        const existingClaim = await ClaimHistory.findOne({ ip: userIp });
        if (existingClaim && now - existingClaim.lastClaimTime < COOLDOWN_PERIOD) {
            res.status(429).json({ message: "Cooldown active. Try again later." });
            return;
        }

        const totalCoupons = await Coupon.countDocuments();
        const counter = await Counter.findOneAndUpdate(
            { name: "coupon_index" },
            { $inc: { index: 1 } },
            { new: true, upsert: true }
        );

        const nextIndex = counter.index % totalCoupons;
        const coupon = await Coupon.findOne().sort({ _id: 1 }).skip(nextIndex);
        if (!coupon) {
            res.status(400).json({ message: "No coupons available!" });
            return;
        }

        sessionId = uuidv4();
        res.cookie("session_id", sessionId, { httpOnly: true, maxAge: COOLDOWN_PERIOD });
        await ClaimHistory.findOneAndUpdate(
            { ip: userIp },
            { lastClaimTime: now },
            { upsert: true });

        res.json({ message: `Coupon claimed successfully! Your code: ${coupon.code}` });
        return;

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error!" });
        return;
    }
};

export default getCoupon;
