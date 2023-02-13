import axios, { AxiosInstance } from "axios";
import { IDeleteParams, ISinglePath, ITwoPaths } from '../constants/types';

const baseURL = "http://localhost:3000/api/fs";
const getContentEndpoint = "/content";
const createFolderEndpoint = "/create";
const renameEndpoint = "/rename";
const deleteEndpoint = "/delete";

const instance: AxiosInstance = axios.create({
    baseURL
});

const getFolderContent = ({ path }: ISinglePath) => {
    return instance.post(getContentEndpoint, { path });
};

const createNewFolder = ({ path }: ISinglePath) => {
    return instance.post(createFolderEndpoint, { path });
};

const renameEntity = ({ oldPath, newPath }: ITwoPaths) => {
    return instance.put(renameEndpoint, {
        newPath,
        oldPath
    });
};

const deleteEntity = ({ entityPath, isDirectory }: IDeleteParams) => {
    return instance.delete(deleteEndpoint, {
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