import React from "react";
import { IDeleteParams, IEntity } from "../constants/types";
import ListGroup from 'react-bootstrap/ListGroup';
import Entity from "./Entity";

interface Props {
    entities: IEntity[];
    handleGoBack: () => void;
    handleFolderClick: (entityName: string) => void;
    handleRename: (name: string) => void;
    handleDelete: ({ entityPath, isDirectory }: IDeleteParams) => void;
}

const EntityList: React.FC<Props> = ({
    entities,
    handleFolderClick,
    handleRename,
    handleGoBack,
    handleDelete
}) => {

    return (
        <ListGroup style={{ padding: "0 20px" }}>
            <Entity
                key=".."
                name=".."
                isDirectory={true}
                handleGoBack={handleGoBack}
            />
            {entities?.map(({ name, isDirectory }) => (
                <Entity
                    key={name}
                    name={name}
                    isDirectory={isDirectory}
                    handleFolderClick={handleFolderClick}
                    handleRename={handleRename}
                    handleDelete={handleDelete}
                />
            ))}
        </ListGroup>
    );
};

export default React.memo(EntityList);