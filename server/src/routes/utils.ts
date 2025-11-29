import { PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET_NAME } from "../aws";
import { generateHexFname } from "../utils";

export function createPutObjectCommand(
        buf: Buffer<ArrayBufferLike>, 
        path: string, 
        file: Express.Multer.File
): [PutObjectCommand, string] {
    const key = path + generateHexFname();
    return [
        new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buf,
            ContentType: file.mimetype,
        }),
        key
    ]
}