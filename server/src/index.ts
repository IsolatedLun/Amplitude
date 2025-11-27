import cors from "cors";
import express from "express";
import multer from "multer";
import db from "./db/connection";

// ========================================
// Options
// ========================================
const PORT = process.env.port || 3000;
const app = express();

const multerMemStorage = multer.memoryStorage();
const multerMemStorageInstance = multer({ storage: multerMemStorage });
const songUploadMiddleWare = multerMemStorageInstance.fields([
    { name: "image", maxCount: 1 }, 
    { name: "audio", maxCount: 1 }
])

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

// ========================================
// Routes/song
// ========================================
app.get("/songs", async(req, res) => {
    const collection = db.collection("song");
    const query = req.query;
    let data = "search" in req.query 
        ? await collection.find({ title: { $regex: `^${query.search}`, $options: "i" } }).toArray()
        : await collection.find({}).toArray();

    res.status(200).send(data);
});
 
app.post("/songs", songUploadMiddleWare, async(req, res) => {
    const collection = db.collection("song");
        
    try {
        const data = { ...req.body }
        if(req.files && "image" in req.files && "audio" in req.files) {
            data["image"] = (req.files as any).image[0].buffer;
            data["audio"] = (req.files as any).audio[0].buffer;
        }

        await collection.insertOne(data);
        res.status(200).send();
    } catch(err: any) {
        res.status(400).send(err);
    }
});


app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});