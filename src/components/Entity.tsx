import React from "react";

interface Props {
    name: string;
    isDirectory: boolean
    handleFolderClick: (entitiName: string) => void
}

const Entity: React.FC<Props> = ({ name, isDirectory, handleFolderClick }) => {

    return (
        <li onClick={() => {
            if (isDirectory) {
                handleFolderClick(name);
            }
        }}>{isDirectory ? `[${name}]` : name}</li>
    );
};

export default Entity;