import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { IDeleteParams, ISinglePath, ITwoPaths } from './constants/types'
import api from './api';
import { validFolderRegex } from './constants/regex';
import EntityList from './components/EntityList';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const ROOT_DIR = "C:/";

function App() {
  const [path, setPath] = useState<string[]>([ROOT_DIR]);
  const [newFolderInput, setNewFolderInput] = useState<string>("");

  const joinedPath: string = path.join("");

  const queryClient: QueryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['folderContent', path], queryFn: () => api.getFolderContent({ path: joinedPath })
  });

  // Mutations - creating, renaming and deleting files/folders.
  // Create mutation. 
  const createFolderMutation = useMutation({
    mutationFn: ({ path }: ISinglePath) => api.createNewFolder({ path }),
    onSuccess: () => {
      alert("Successfully created a new folder!");
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
      setNewFolderInput("");
    },
    onError: () => alert("An error has occurred")
  });

  // Rename Mutation
  const renameEntityMutation = useMutation({
    mutationFn: ({ oldPath, newPath }: ITwoPaths) => api.renameEntity({ oldPath, newPath }),
    onSuccess: () => {
      alert("Renaming went successfully!");
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
    },
    onError: () => alert("An error has occurred")
  });

  // Delete Mutation
  const deleteEntityMutation = useMutation({
    mutationFn: ({ entityPath, isDirectory }: IDeleteParams) => api.deleteEntity({ entityPath, isDirectory }),
    onSuccess: () => {
      alert("Deleting went successfully!");
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
    },
    onError: () => alert("An error has occurred")
  });

  // Handlers
  // Adds The clicked folder name to the path state, hence causing a rerender and refetching of the relevant data.
  const handleFolderClick = useCallback((entityName: string) => {
    setPath(oldPath => [...oldPath, `${entityName}/`]);
  }, []);

  // Creates a new folder based on the newFolderInput state value.s
  const handleCreateFolder = useCallback(() => {
    if (!newFolderInput.match(validFolderRegex)) {
      return alert(`The following characters are not allowed: \\ / : * ? " < > |`);
    }

    createFolderMutation.mutate({ path: path.join("") + newFolderInput });
  }, [path, newFolderInput]);

  const handleDeleteEntity = useCallback(({ entityPath, isDirectory }: IDeleteParams) => {
    deleteEntityMutation.mutate({
      entityPath: path + entityPath,
      isDirectory
    });
  }, [path]);

  const handleRenameEntity = useCallback((name: string) => {
    const newName: string | null = prompt("Enter a new name");

    if (!newName) {
      return;
    }

    renameEntityMutation.mutate({
      oldPath: joinedPath + name + '/',
      newPath: joinedPath + newName + "/"
    });
  }, [joinedPath]);

  const handleGoBack = useCallback(() => {
    setPath(oldPath => {
      if (oldPath.length === 1) {
        return oldPath;
      }

      const oldPathCopy = [...oldPath];
      oldPathCopy.pop();

      return oldPathCopy;
    })
  }, []);

  return (
    <div
      className='bg-secondary'
      style={{ minHeight: "100vh", maxWidth: "100vw" }}
    >
      <Header />
      <Container className='p-3'>
        <Row className='mb-3'>
          <Col md={6} xs={12}>
            <span className='fw-semibold fs-3'>Current path: </span>
            <span className='fs-3'>{path.join("")}</span>
          </Col>
          <Col md={6} xs={12} className="d-flex flex-column align-items-center">
            <h4>Create a new folder</h4>
            <Form.Control
              className='w-50 mb-3'
              type="text"
              placeholder='Enter name...'
              value={newFolderInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFolderInput(e.target.value)}
            />
            <Button
              className='w-50'
              variant='success'
              disabled={newFolderInput.length === 0}
              onClick={handleCreateFolder}
            >
              CREATE
            </Button>
          </Col>
        </Row>
        <Row>
          {isError && (
            <Alert variant='danger'>
              An error has occurred
            </Alert>
          )}
          {isLoading && (
            <Spinner
              animation="border"
              variant="primary"
              className='mx-auto' />
          )}
          {data && data?.data && (
            <EntityList
              entities={data.data.data}
              handleGoBack={handleGoBack}
              handleFolderClick={handleFolderClick}
              handleRename={handleRenameEntity}
              handleDelete={handleDeleteEntity}
            />
          )}
        </Row>
      </Container >
    </div >
  );
}

export default App;
