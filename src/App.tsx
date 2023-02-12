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

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['folderContent', path], queryFn: () => axios.post("http://localhost:3000/api/fs/content", { path: path.join("") })
  })

  const handleFolderClick = useCallback((entityName: string) => {
    setPath(oldPath => [...oldPath, `${entityName}/`]);
  }, []);

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

  // Mutations
  const createFolderMutation = useMutation({
    mutationFn: (newFolderPath: string) => axios.post("http://localhost:3000/api/fs/create", {
      path: newFolderPath
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folderContent', path] });
      setNewFolderInput("");
    }
  });

  const renameFolderMutation = useMutation({
    mutationFn: (argsObj: { oldPath: string, newPath: string }) => axios.put("http://localhost:3000/api/fs/rename", { ...argsObj }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folderContent'] });
    }
  });

  const handleRename = useCallback((name: string) => {
    renameFolderMutation.mutate({
      oldPath: path.join("") + name,
      newPath: path.join("") + "kakiiiiiiiiiiii"
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Header />
      <Container className='p-3'>
        <Row>
          <Col md={6} xs={12}>
            <span className='fw-semibold fs-3'>Current path: </span>
            <span className='fs-3'>{path.join("")}</span>
          </Col>
          <Col md={6} xs={12} className="d-flex flex-column align-items-center">
            <h4>Create a new folder</h4>
            <Form.Control
              className='w-50 mb-3'
              type="text"
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
