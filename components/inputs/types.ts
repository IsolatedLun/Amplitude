import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { DocumentPickerAsset } from "expo-document-picker"
import { ImagePickerAsset } from "expo-image-picker"
import { ComponentProps } from "react"

export enum EWordInputTheme { Primary };
export enum EWordInputBorderRadius { Cube };
export enum EWordInputBorderThickness { Default, Thin };
export interface IWordInput {
    title: string,
    value: string,
    placeholder: string,

    error?: string,
    theme?: EWordInputTheme,
    borderRadiusMode?: EWordInputBorderRadius,
    borderThicknessMode?: EWordInputBorderThickness,
    onInput?: (v: string) => void,
    onBlur?: (e: any) => void
}

export enum EMediaInputMode { Document, Image };
export interface IImageInput {
    value: File | null,
    
    onInput: (f: File | null) => void,
    onBlur?: (e: any) => void,
    error?: string
}

export interface IMediaInput {
    value: string,
    placeholder: string,
    mode: EMediaInputMode,
    onInput: (v: string) => void,

    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"],
    error?: string,
    onBlur?: (e: any) => void
}
export type TFilePickerAsset = ImagePickerAsset | DocumentPickerAsset;
export interface IFilePickerAssetProps {
    size: number,
    name: string
}