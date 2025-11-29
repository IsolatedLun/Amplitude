import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    GetObjectCommand,
    GetObjectCommandInput
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import sharp from "sharp";
import { BUCKET_NAME, s3, SONG_AUDIO_FOLDER, SONG_IMAGE_FOLDER } from "../aws";
import db from "../db/connection";
import { createPutObjectCommand } from "./utils";

const SongRouter = express.Router();
const multerMemStorage = multer.memoryStorage();
const multerMemStorageInstance = multer({ storage: multerMemStorage });
const songUploadMiddleWare = multerMemStorageInstance.fields([
    { name: "image", maxCount: 1 }, 
    { name: "audio", maxCount: 1 }
])

// ========================================
// Get Songs
// ========================================
SongRouter.get("", async(req, res) => {
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

    res.status(200).json(data);
});


// ========================================
// Get/Delete Song
// ========================================
SongRouter.get("/:id", async(req, res) => {
    const collection = db.collection("song");
    const { id } = req.params as { id: string };
    const song = await collection.findOne({ _id: new ObjectId(id) });

    if(!song)
        return res.status(404).send({ message: `Song with id of <${id}> not found` });

    const imageCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: song.image });
    const audioCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: song.audio });

    song.image = await getSignedUrl(s3, imageCommand, { expiresIn: 3600 });
    song.audio = await getSignedUrl(s3, audioCommand, { expiresIn: 3600 });

    res.status(200).json(song);
});

SongRouter.delete("/:id", async(req, res) => {
    const collection = db.collection("song");
    const { id } = req.params as { id: string };
    const song = await collection.findOneAndDelete({ _id: new ObjectId(id) })!;
    if(song === null)
        return res.status(404).send({ "message": `Song with id of <${id}> not found` });

    const imageParams: DeleteObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: song.image,
    };
    const audioParams: DeleteObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: song.audio,
    };

    const imageCommand = new DeleteObjectCommand(imageParams);
    const audioCommand = new DeleteObjectCommand(audioParams);

    await s3.send(imageCommand);
    await s3.send(audioCommand);

    res.status(200).send({ message: "success" });
});


// ========================================
// Post/Patch Song
// ========================================
SongRouter.post("", songUploadMiddleWare, async(req, res) => {
    const collection = db.collection("song");
        
    try {
        const data = { ...req.body };
        if(!(req.files && "image" in req.files && "audio" in req.files))
            throw new Error("Missing files");

        const imageBuffer = await sharp(req.files.image[0].buffer)
            .resize({ width: 1024, height: 1024, fit: "contain" })
            .jpeg()
            .toBuffer();

        const [imageCommand, imageKey] = createPutObjectCommand(
            imageBuffer, 
            SONG_IMAGE_FOLDER, 
            req.files.image[0]
        );
        const [audioCommand, audioKey] = createPutObjectCommand(
            req.files.audio[0].buffer, 
            SONG_AUDIO_FOLDER, 
            req.files.audio[0]
        );

        await s3.send(imageCommand);
        await s3.send(audioCommand);

        data["image"] = imageKey;
        data["audio"] = audioKey;

        await collection.insertOne(data);
        res.status(200).send();
    } catch(err: any) {
        res.status(400).send({ message: err.message });
    }
});

export default SongRouter;