import mongoose from "mongoose";

const ClaimHistorySchema = new mongoose.Schema({
    ip: {
        type: String,
        unique: true,
        required: true
    },
    lastClaimTime: {
        type: Date,
        default: Date.now()
    }
});

const ClaimHistory = mongoose.model("ClaimHistory", ClaimHistorySchema);
export default ClaimHistory;