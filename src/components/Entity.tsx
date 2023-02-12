import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

interface Props {
    name: string;
    isDirectory: boolean;
    handleFolderClick?: (entitiName: string) => void;
    handleRename?: (name: string) => void;
    handleGoBack?: () => void;
}

const Entity: React.FC<Props> = ({ name, isDirectory, handleFolderClick, handleRename, handleGoBack }) => {
    console.log("entity render");

    const handleNameClick = () => {
        if (isDirectory) {
            if (handleFolderClick) {
                handleFolderClick(name);
                return;
            }
            if (handleGoBack) {
                handleGoBack();
            }
        }
    }

    const handleRenameClick = () => {
        if (handleRename) {
            handleRename(name);
        }
    }

    return (
        <ListGroup.Item
            as={"div"}
            className={"py-3 d-flex justify-content-between align-items-center"}
            variant="light"
            action={isDirectory}
        >
            <span
                className={`fs-5 fw-semibold ${isDirectory ? "text-dark dir-name" : ""}`}
                onClick={handleNameClick}
            >
                {isDirectory ? `[${name}]` : name}
            </span>
            {handleRename && (
                <div>
                    <Button
                        variant="warning"
                        onClick={handleRenameClick}
                    >
                        RENAME
                    </Button>
                    <Button
                        variant="danger"
                        className="ms-2"
                    >
                        DELETE
                    </Button>
                </div>
            )}
        </ListGroup.Item>
    );
};

export default Entity;