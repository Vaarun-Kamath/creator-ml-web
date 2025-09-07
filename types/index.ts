export type SavedKeyword = {
    _id: string;
    keyword: string;
    competition: number;
    demand: number;
    addedAt: string;
};

export type ProjectType = {
    _id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    savedKeywords: SavedKeyword[];
};