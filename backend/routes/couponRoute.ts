import express from "express";
import getCoupon from "../controllers/couponController";
const router = express.Router();

router.get("/get-coupon", getCoupon);

export default router;