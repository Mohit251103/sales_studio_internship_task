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

        let existingClaim: any = await ClaimHistory.findOne({ ip: userIp });;
        let hour = 0;
        let minutes = 0;
        let seconds = 0;
        if (sessionId && existingClaim) { 
            const remaining = existingClaim.lastClaimTime + COOLDOWN_PERIOD - now;
            hour = Math.floor(remaining / (1000 * 60 * 60));
            minutes = Math.floor((remaining - hour*60*60*1000) / (1000 * 60));
            seconds = Math.floor((remaining - (hour * 60 * 60 * 1000 + minutes * 60 * 1000)) / 1000);
            res.status(429).json({
                message: `You have ${hour ? `${hour} hours ` : ""} ${minutes ? `${minutes} minutes ` : ""}
                 ${seconds ? `${seconds} seconds ` : ""} remaining before you can generate another token.`
            });
            return;
        }


        if (existingClaim && now - existingClaim.lastClaimTime < COOLDOWN_PERIOD) {
            res.status(429).json({
                message: `You have ${hour ? `${hour} hours ` : ""} ${minutes ? `${minutes} minutes ` : ""}
                 ${seconds ? `${seconds} seconds ` : ""} remaining before you can generate another token.` });
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
        res.cookie("session_id", sessionId, {
            httpOnly: true,
            maxAge: COOLDOWN_PERIOD,
            sameSite: "none",
            secure: true
        });
        await ClaimHistory.findOneAndUpdate(
            { ip: userIp },
            { lastClaimTime: now },
            { upsert: true });

        res.json({ message: `Coupon claimed successfully! Your code: ${coupon.code}`, coupon });
        return;

    } catch (error) {
        res.status(500).json({ message: "Server error!" });
        return;
    }
};

export default getCoupon;
