import React from "react";
import { IEntity } from "../constants/types";
import ListGroup from 'react-bootstrap/ListGroup';
import Entity from "./Entity";

interface Props {
    entities: IEntity[],
    handleFolderClick: (entitiName: string) => void,
    handleRename: (name: string) => void,
    handleGoBack: () => void
}

const EntityList: React.FC<Props> = ({ entities, handleFolderClick, handleRename, handleGoBack }) => {
    console.log("ul render")

    return (
        <ListGroup style={{ padding: "0 20px" }}>
            <Entity
                name=".."
                isDirectory={true}
                handleGoBack={handleGoBack}
            />
            {entities?.map(({ name, isDirectory }, i) => (
                <Entity
                    key={name}
                    name={name}
                    isDirectory={isDirectory}
                    handleFolderClick={handleFolderClick}
                    handleRename={handleRename}
                    handleGoBack={handleGoBack}
                />
            ))}
        </ListGroup>
    );
};

export default React.memo(EntityList);