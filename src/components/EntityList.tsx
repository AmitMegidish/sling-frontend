import React from "react";
import { IEntity } from "../constants/types";
import Entity from "./Entity";

interface Props {
    entities: IEntity[],
    handleFolderClick: (entitiName: string) => void
}

const EntityList: React.FC<Props> = ({ entities, handleFolderClick }) => {
    return (
        <ul>
            {entities?.map(({ name, isDirectory }, i) => (
                <Entity
                    key={name + i}
                    name={name}
                    isDirectory={isDirectory}
                    handleFolderClick={handleFolderClick}
                />
            ))}
        </ul>
    );
};

export default EntityList;