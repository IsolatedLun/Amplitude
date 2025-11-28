export interface ISongPreview {
    _id: string,
    title: string,
    author: string,
    image: string,
}

export interface ISong extends ISongPreview {
    audio: string
}