export interface ISongCard {
    id: string,
    title: string,
    author: string,
    
    image: string,
    audio: string,

    dateCreated: string,
    isFavorite: boolean,
    onDelete?: (id: string) => void;
}

export type ISongCardFormData = Omit<ISongCard, "id" | "onDelete" | "dateCreated" | "isFavorite">;