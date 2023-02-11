import React from "react";
import { IEntity } from "../constants/types";
import Entity from "./Entity";

interface Props {
    entities: IEntity[]
}

const EntityList: React.FC<Props> = ({ entities }) => {
    return (
        <ul>
            {entities.map(({ name, isDirectory }) => (
                <Entity
                    name={name}
                    isDirectory={isDirectory}
                />
            ))}
        </ul>
    );
};

export default EntityList;