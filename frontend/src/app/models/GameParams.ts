export type GameParams ={
    orderBy: string; // always a default ordering
    searchTerm?: string;
    genres: string[],
    publishers: string[];
    pageNumber: number,
    pageSize: number
}