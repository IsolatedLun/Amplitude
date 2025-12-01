import cors from "cors";
import express from "express";
import SongRouter from "./routes/song";
import UserRouter from "./routes/user/user";

// ========================================
// Options
// ========================================
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors({
    origin: "*",
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