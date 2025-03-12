"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const checkVPN = async (req, res, next) => {
    try {
        const userIp = req.clientIp;
        if (userIp === "127.0.0.1" || userIp === "::1") {
            return next();
        }
        const response = await axios_1.default.get(`https://ipqualityscore.com/api/json/ip/${process.env.IPQS_API_KEY}/${userIp}`);
        if (response.data.vpn || response.data.proxy) {
            res.status(403).json({ message: "VPN or proxy detected. Access denied." });
            return;
        }
        next();
    }
    catch (error) {
        console.error("VPN check failed:", error.message);
        res.status(500).json({ message: "Error checking VPN status. Please try again." });
        return;
    }
};
exports.default = checkVPN;
