import {
    DeleteObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import { BUCKET_NAME, s3, SONG_AUDIO_FOLDER, SONG_IMAGE_FOLDER } from "../aws";
import db from "../db/connection";
import { createPutObjectCommand, optimizeImage } from "../utils";
import { ISong } from "./types";

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
SongRouter.get("/", async(req, res) => {
    const collection = db.collection<ISong>("song");
    const query = req.query;
    let data = "search" in req.query 
        ? await collection.find({ title: { $regex: `^${query.search}`, $options: "i" } }).toArray()
        : await collection.find({}).toArray();

    for(const song of data) {
        const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: song.image });
        song.image = await getSignedUrl(s3, command, { expiresIn: 3600 });
    }

    res.status(200).json(data);
});


// ========================================
// Get/Delete Song
// ========================================
SongRouter.get("/:id", async(req, res) => {
    const collection = db.collection<ISong>("song");
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
    const collection = db.collection<ISong>("song");
    const { id } = req.params as { id: string };
    const song = await collection.findOneAndDelete({ _id: new ObjectId(id) })!;
    if(!song)
        return res.status(404).send({ "message": `Song with id of <${id}> not found` });

    const imageCommand = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: song.image });
    const audioCommand = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: song.audio });

    await s3.send(imageCommand);
    await s3.send(audioCommand);

    res.status(200).send({ message: "success" });
});


// ========================================
// Post/Put Song
// ========================================
SongRouter.put("/:id", songUploadMiddleWare, async(req, res) => {
    const collection = db.collection<ISong>("song");
    const { id } = req.params as { id: string };
    if(!collection.findOne({ _id: new ObjectId(id) }))
        return res.status(404).send({ "message": `Song with id of <${id}> not found` });
        
    try {
        const data = { ...req.body };
        if(req.files && "image" in req.files) {
            const imageBuffer = await optimizeImage(req.files.image[0].buffer);
            const [imageCommand, imageKey] = createPutObjectCommand(
                imageBuffer, 
                SONG_IMAGE_FOLDER, 
                req.files.image[0]
            );
            
            data["image"] = imageKey;
            await s3.send(imageCommand);
        };

        if(req.files && "audio" in req.files) {
            const [audioCommand, audioKey] = createPutObjectCommand(
                req.files.audio[0].buffer, 
                SONG_AUDIO_FOLDER, 
                req.files.audio[0]
            );
    
            data["audio"] = audioKey;
            await s3.send(audioCommand);
        };


        await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.status(200).send({ message: "success" });
    } catch(err: any) {
        res.status(400).send({ message: err.message });
    }
});

SongRouter.post("", songUploadMiddleWare, async(req, res) => {
    const collection = db.collection<ISong>("song");

    try {
        const data = { ...req.body };
        if(!(req.files && "image" in req.files && "audio" in req.files))
            throw new Error("Missing files");

        console.log("received")
        const imageBuffer = await optimizeImage(req.files.image[0].buffer)
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

        const song = await collection.insertOne(data);
        res.status(200).send({ id: song.insertedId });
    } catch(err: any) {
        console.log(req.body.body)
        res.status(400).send({ message: err.message });
    }
});

export default SongRouter;