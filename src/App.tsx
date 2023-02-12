import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EntityList from './components/EntityList';
import axios from 'axios';
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

  const joinedPath = path.join("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['folderContent', path], queryFn: () => axios.post("http://localhost:3000/api/fs/content", { path: joinedPath })
  })

  // Mutations - creating, renaming and deleting files/folders.
  const createFolderMutation = useMutation({
    mutationFn: (newFolderPath: string) => axios.post("http://localhost:3000/api/fs/create", {
      path: newFolderPath
    }),
    onSuccess: () => {
      alert("Successfully created a new folder!");
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
      setNewFolderInput("");
    }
  });

  const renameFolderMutation = useMutation({
    mutationFn: (argsObj: { oldPath: string, newPath: string }) => axios.put("http://localhost:3000/api/fs/rename", argsObj),
    onSuccess: () => {
      alert("Renaming went successfully!");
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
    }
  });


  // Handlers
  // Adds The clicked folder name to the path state, hence causing a rerender and refetching of the relevant data.
  const handleFolderClick = useCallback((entityName: string) => {
    setPath(oldPath => [...oldPath, `${entityName}/`]);
  }, []);

  const handleRename = useCallback((name: string) => {
    const newName = prompt("Enter a new name");

    if (!newName) {
      return;
    }

    renameFolderMutation.mutate({
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
              onClick={() => {
                console.log(path.join("") + newFolderInput)
                createFolderMutation.mutate(path.join("") + newFolderInput);
              }}
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
              handleFolderClick={handleFolderClick}
              handleRename={handleRename}
              handleGoBack={handleGoBack}
            />
          )}
        </Row>
      </Container >
    </div >
  );
}

export default App;
