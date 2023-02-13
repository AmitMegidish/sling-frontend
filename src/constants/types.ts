export interface IEntity {
    name: string;
    isDirectory: boolean;
}

export interface ISinglePath {
    path: string;
}

export interface ITwoPaths {
    oldPath: string;
    newPath: string;
}

export interface IDeleteParams {
    entityPath: string;
    isDirectory: boolean
}