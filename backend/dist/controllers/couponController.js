"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Coupon_1 = __importDefault(require("../models/Coupon"));
const Counter_1 = __importDefault(require("../models/Counter"));
const ClaimHistory_1 = __importDefault(require("../models/ClaimHistory"));
const COOLDOWN_PERIOD = 60 * 1000;
const getCoupon = async (req, res) => {
    try {
        const userIp = req.clientIp;
        let sessionId = req.cookies.session_id;
        const now = Date.now();
        if (sessionId) {
            res.status(429).json({ message: "You have already claimed a coupon. Try again later!" });
            return;
        }
        const existingClaim = await ClaimHistory_1.default.findOne({ ip: userIp });
        if (existingClaim && now - existingClaim.lastClaimTime < COOLDOWN_PERIOD) {
            res.status(429).json({ message: "Cooldown active. Try again later." });
            return;
        }
        const totalCoupons = await Coupon_1.default.countDocuments();
        const counter = await Counter_1.default.findOneAndUpdate({ name: "coupon_index" }, { $inc: { index: 1 } }, { new: true, upsert: true });
        const nextIndex = counter.index % totalCoupons;
        const coupon = await Coupon_1.default.findOne().sort({ _id: 1 }).skip(nextIndex);
        if (!coupon) {
            res.status(400).json({ message: "No coupons available!" });
            return;
        }
        sessionId = (0, uuid_1.v4)();
        res.cookie("session_id", sessionId, { httpOnly: true, maxAge: COOLDOWN_PERIOD });
        await ClaimHistory_1.default.findOneAndUpdate({ ip: userIp }, { lastClaimTime: now }, { upsert: true });
        res.json({ message: `Coupon claimed successfully! Your code: ${coupon.code}` });
        return;
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error!" });
        return;
    }
};
exports.default = getCoupon;
