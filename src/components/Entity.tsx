import React from "react";

interface Props {
    name: string;
    isDirectory: boolean
}

const Entity: React.FC<Props> = ({ name, isDirectory }) => {
    return (
        <li>Name: {name}, directory: {isDirectory ? "yes!" : "noooo"}</li>
    );
};

export default Entity;