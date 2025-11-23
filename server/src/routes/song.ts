import express from "express";
import db from "../db/connection";

const SongRouter = express.Router();

SongRouter.get("/", async(req, res) => {
    const collection = db.collection("song");
    const data = await collection.find({}).toArray();
    
    res.status(200).send(data);
});

export default SongRouter;