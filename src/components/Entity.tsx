import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import { IDeleteParams } from "../constants/types";

interface Props {
    name: string;
    isDirectory: boolean;
    handleGoBack?: () => void;
    handleFolderClick?: (entityName: string) => void;
    handleRename?: (name: string) => void;
    handleDelete?: ({ entityPath, isDirectory }: IDeleteParams) => void;
}

const Entity: React.FC<Props> = ({
    name,
    isDirectory,
    handleGoBack,
    handleFolderClick,
    handleRename,
    handleDelete
}) => {

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

    const handleDeleteClick = () => {
        if (handleDelete) {
            handleDelete({
                entityPath: name,
                isDirectory
            })
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
                        onClick={handleDeleteClick}
                    >
                        DELETE
                    </Button>
                </div>
            )}
        </ListGroup.Item>
    );
};

export default Entity;