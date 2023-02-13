import axios, { AxiosInstance } from "axios";
import { IDeleteParams, ISinglePath, ITwoPaths } from '../constants/types';

const enum EUrl {
    baseURL = "http://localhost:3000/api/fs",
    getContentEndpoint = "/content",
    createFolderEndpoint = "/create",
    renameEndpoint = "/rename",
    deleteEndpoint = "/delete"
}

const instance: AxiosInstance = axios.create({
    baseURL: EUrl.baseURL
});

const getFolderContent = ({ path }: ISinglePath) => {
    return instance.post(EUrl.getContentEndpoint, { path });
};

const createNewFolder = ({ path }: ISinglePath) => {
    return instance.post(EUrl.createFolderEndpoint, { path });
};

const renameEntity = ({ oldPath, newPath }: ITwoPaths) => {
    return instance.put(EUrl.renameEndpoint, {
        newPath,
        oldPath
    });
};

const deleteEntity = ({ entityPath, isDirectory }: IDeleteParams) => {
    return instance.delete(EUrl.deleteEndpoint, {
        data: {
            entityPath,
            isDirectory
        }
    });
};

const api = {
    getFolderContent,
    createNewFolder,
    renameEntity,
    deleteEntity
};

export default api;