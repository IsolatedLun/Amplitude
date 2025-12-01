import bcrypt from "bcrypt";
import express from "express";
import * as jwt from "jsonwebtoken";
import db from "../../db/connection";
import { generateUUID } from "../../utils";
import { IUser } from "../types";
import { loginValidationSchema, signUpValidationSchema } from "./schemas";

const UserRouter = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "shhhhh";
const saltRounds = 10;

UserRouter.get("/", async(req, res) => {
    const collection = db.collection<IUser>("user");
    const users = await collection.find({}).project({ refreshToken: 0 }).toArray();
    res.status(200).send(users);
});

// ========================================
// Login/Signup/Logout
// ========================================
UserRouter.post("/login", async(req, res) => {
    const { value, error } = loginValidationSchema.validate(req.body);
    if(error)
        return res.status(400).send(error);
    
    const collection = db.collection<IUser>("user");
    const { username, password } = value;
    const user = await collection.findOne({ username });
    if(!user)
        return res.status(400).send({ error: "Incorrect username/password" });

    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    if(!doPasswordsMatch)
        return res.status(400).send({ error: "Incorrect username/password" });

    const tok = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: "7d" });
    res.status(200).send({ token: tok });

});

UserRouter.post("/signup", async(req, res) => {
    const { value, error } = signUpValidationSchema.validate(req.body);
    if(error)
        return res.status(400).send({ error: error.message });
    
    const collection = db.collection<IUser>("user");
    const { username, password } = value;
    const user = await collection.findOne({ username });
    if(user)
        return res.status(400).send({ error: "Username already exists" });

    bcrypt.hash(password, saltRounds, async(err, hash) => {
        const refreshToken = jwt.sign({ uuid: generateUUID() }, JWT_SECRET_KEY, { expiresIn: "30d" });
        await collection.insertOne({ username, refreshToken, password: hash, profile: "" });
        res.status(200).send({ ok: true });
    });
});

export default UserRouter;