import cors from "cors";
import express from "express";
import multer from "multer";
import db from "./db/connection";
import { 
    S3Client, 
    GetObjectCommand, 
    PutObjectCommand, 
    DeleteObjectCommand, 
    PutObjectCommandInput, 
    GetObjectCommandInput} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateHexFname } from "./utils";
import sharp from "sharp"

// ========================================
// Options
// ========================================
const PORT = process.env.PORT || 3000;
const BUCKET_NAME = process.env.BUCKET_NAME || "";
const BUCKET_REGION = process.env.BUCKET_REGION || "";
const ACCESS_KEY = process.env.ACCESS_KEY || "";
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";

const app = express();
const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    },
});

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

    for(const song of data) {
        const imageParams: GetObjectCommandInput = {
            Bucket: BUCKET_NAME,
            Key: song.image
        }
        const command = new GetObjectCommand(imageParams);
        song.image = await getSignedUrl(s3, command, { expiresIn: 3600 });
    }

    res.status(200).send(data);
});
 
app.post("/songs", songUploadMiddleWare, async(req, res) => {
    const collection = db.collection("song");
        
    try {
        const data = { ...req.body };
        if(!(req.files && "image" in req.files && "audio" in req.files)) {
            throw Error("Missing files");
        }

        const imageBuffer = await sharp(req.files.image[0].buffer)
            .resize({ width: 1024, height: 1024, fit: "contain" })
            .jpeg()
            .toBuffer();

        const imageParams: PutObjectCommandInput = {
            Bucket: BUCKET_NAME,
            Key: generateHexFname(),
            Body: imageBuffer,
            ContentType: req.files.image[0].mimetype,
        };
        const audioParams: PutObjectCommandInput = {
            Bucket: BUCKET_NAME,
            Key: generateHexFname(),
            Body: req.files.audio[0].buffer,
            ContentType: req.files.audio[0].mimetype,
        };

        const imageCommand = new PutObjectCommand(imageParams);
        const audioCommand = new PutObjectCommand(audioParams);

        await s3.send(imageCommand);
        await s3.send(audioCommand);

        data["image"] = imageParams.Key;
        data["audio"] = audioParams.Key;

        await collection.insertOne(data);
        res.status(200).send();
    } catch(err: any) {
        res.status(400).send(err);
    }
});


app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});