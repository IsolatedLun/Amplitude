import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import SongRouter from "./routes/song";
import UserRouter from "./routes/user/user";

// ========================================
// Options
// ========================================
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8000;
const PORT = process.env.PORT || 3000;
const app = express();
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 120,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 52
});

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));
app.use(limiter);

// ========================================
// Routes
// ========================================
app.use("/songs", SongRouter);
app.use("/users", UserRouter);

app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});