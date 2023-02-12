import React from "react";

interface Props {
    name: string;
    isDirectory: boolean;
    handleFolderClick: (entitiName: string) => void;
    handleRename: (name: string) => void
}

const Entity: React.FC<Props> = ({ name, isDirectory, handleFolderClick, handleRename }) => {
    console.log("entity render")

    return (
        <li style={{ display: "flex", listStyle: "none", justifyContent: "space-between" }}>
            <span
                onClick={() => {
                    if (isDirectory) {
                        handleFolderClick(name);
                    }
                }}
            >
                {isDirectory ? `[${name}]` : name}
            </span>
            <div>
                <button onClick={() => {
                    handleRename(name)
                }}>RENAME</button>
                <button>DELETE</button>
            </div>
        </li>
    );
};

export default Entity;