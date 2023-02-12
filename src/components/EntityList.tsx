import React from "react";
import { IEntity } from "../constants/types";
import Entity from "./Entity";

interface Props {
    entities: IEntity[],
    handleFolderClick: (entitiName: string) => void,
    handleRename: (name: string) => void
}

const EntityList: React.FC<Props> = ({ entities, handleFolderClick, handleRename }) => {
    console.log("ul render")

    return (
        <ul style={{ padding: "0 20px" }}>
            {entities?.map(({ name, isDirectory }, i) => (
                <Entity
                    key={name + i}
                    name={name}
                    isDirectory={isDirectory}
                    handleFolderClick={handleFolderClick}
                    handleRename={handleRename}
                />
            ))}
        </ul>
    );
};

export default React.memo(EntityList);