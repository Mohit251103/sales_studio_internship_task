"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const request_ip_1 = __importDefault(require("request-ip"));
const database_1 = __importDefault(require("./config/database"));
const checkVPN_1 = __importDefault(require("./middlewares/checkVPN"));
const couponRoute_1 = __importDefault(require("./routes/couponRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(request_ip_1.default.mw());
app.use(checkVPN_1.default);
(0, database_1.default)();
app.use("/api/v1/", couponRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
