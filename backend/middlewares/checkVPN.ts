import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const checkVPN = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userIp = req.clientIp;

        if (userIp === "127.0.0.1" || userIp === "::1") {
            return next();
        }

        const response = await axios.get(`https://ipqualityscore.com/api/json/ip/${process.env.IPQS_API_KEY}/${userIp}`);

        if (response.data.vpn || response.data.proxy) {
            res.status(403).json({ message: "VPN or proxy detected. Access denied." });
            return;
        }

        next();
    } catch (error: any) {
        console.error("VPN check failed:", error.message);
        res.status(500).json({ message: "Error checking VPN status. Please try again." });
        return;
    }
}

export default checkVPN;