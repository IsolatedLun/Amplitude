import express from "express";
import db from "../db/connection";

const SongRouter = express.Router();

SongRouter.get("/", async(req, res) => {
    db;
    
    res.status(200).send("fuck you");
});

export default SongRouter;