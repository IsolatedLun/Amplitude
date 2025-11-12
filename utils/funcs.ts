import { IFilePickerAssetProps, TFilePickerAsset } from "@/components/inputs/types";
import uuid from 'react-native-uuid';

export function capitalizeSentence(x: string): string {
    return x.slice(0, 1).toUpperCase() + x.slice(1);
}

export function bytesToMB(x: number): number {
    return parseFloat((x / 1e+6).toPrecision(4));
}

export function generateID(): string {
    return uuid.v4();
}

export function getFileNameFromURI(x: string): string {
    return x.split("/").at(-1) ?? "";
}

export function tryGetFileNameFromFilePickerAsset(f: TFilePickerAsset): string | null {
    if("fileName" in f) return f.fileName!;
    if("name" in f) return f.name!;
    return null;
}

export function extractFileAssetData(f: TFilePickerAsset): IFilePickerAssetProps {
    const fName: string | null = tryGetFileNameFromFilePickerAsset(f);
    const data: IFilePickerAssetProps = {
        size: 0,
        name: fName ?? getFileNameFromURI(f.uri)
    }

    if("size" in f)
        data.size = bytesToMB(f.size!)
    else if("fileSize" in f)
        data.size = bytesToMB(f.fileSize!)

    return data;
}