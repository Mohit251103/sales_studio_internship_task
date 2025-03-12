"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClaimHistorySchema = new mongoose_1.default.Schema({
    ip: {
        type: String,
        unique: true,
        required: true
    },
    lastClaimTime: {
        type: Number,
        default: Date.now()
    }
});
const ClaimHistory = mongoose_1.default.model("ClaimHistory", ClaimHistorySchema);
exports.default = ClaimHistory;
