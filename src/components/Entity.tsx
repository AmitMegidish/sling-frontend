import React from "react";

interface Props {
    name: string;
    isDirectory: boolean
}

const Entity: React.FC<Props> = ({ name, isDirectory }) => {

    return (
        <li>{isDirectory ? `[${name}]` : name}</li>
    );
};

export default Entity;