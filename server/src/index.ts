import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import SongRouter from "./routes/song";
import UserRouter from "./routes/user/user";
import morgan from "morgan";

// ========================================
// Options
// ========================================
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8000;
const PORT = process.env.PORT || 3000;
const app = express();
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5mins
    limit: 120, // 120 requests every 5mins
    standardHeaders: "draft-8",
    legacyHeaders: true,
    ipv6Subnet: 52
});

app.use(morgan("common"));
app.use(limiter);
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

// ========================================
// Routes
// ========================================
app.use("/songs", SongRouter);
app.use("/users", UserRouter);

app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});