import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import requestIp from "request-ip"
import connectDB from "./config/database";
import checkVPN from "./middlewares/checkVPN";
import couponRouter from "./routes/couponRoute";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw());
app.use(checkVPN);

connectDB();
app.use("/api/v1/", couponRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})