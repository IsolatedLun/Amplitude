import cors from "cors";
import express from "express";
import SongRouter from "./routes/song";

const PORT = process.env.port || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/songs", SongRouter);

app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});