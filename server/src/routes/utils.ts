import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { BUCKET_NAME } from "../aws";
import { generateHexFname } from "../utils";

export function optimizeImage(buf: Buffer<ArrayBufferLike>): Promise<Buffer<ArrayBufferLike>> {
    return sharp(buf)
        .resize({ width: 1024, height: 1024, fit: "contain" })
        .jpeg()
        .toBuffer();
}

// ========================================
// AWS helpers
// ========================================
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
};