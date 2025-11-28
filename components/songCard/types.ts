export interface ISongCard {
    _id: string,
    title: string,
    author: string,
    
    image: string,
    audio: string,

    dateCreated: string,
    isFavorite: boolean,
    onDelete?: (id: string) => void;
}

export type ISongCardFormData = Omit<ISongCard, "_id" | "onDelete" | "dateCreated" | "isFavorite">;