import { ObjectId } from "mongodb";

export interface ISongPreview {
    _id: ObjectId,
    title: string,
    author: string,
    image: string,
}

export interface ISong extends ISongPreview {
    audio: string
}