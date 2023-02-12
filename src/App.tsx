import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EntityList from './components/EntityList';
import logo from './assets/sling.png';
import axios from 'axios';

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

  const handleRename = (name: string) => {
    renameFolderMutation.mutate({
      oldPath: path.join("") + name,
      newPath: path.join("") + "kakiiiiiiiiiiii"
    });
  };

  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <div>
        <img src={logo} alt="" width={200} height={200 / 3.61} />
      </div>
      <div>
        <h1>Current path: {path.join("")}</h1>
      </div>

      <div>
        <h4>New Folder</h4>
        <input
          type="text"
          value={newFolderInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFolderInput(e.target.value)}
        />
        <button
          onClick={() => {
            console.log(path.join("") + newFolderInput)
            createFolderMutation.mutate(path.join("") + newFolderInput);
          }}
        >
          create a new folder
        </button>
      </div>
      <button
        disabled={path.length === 1}
        onClick={handleGoBack}
      >
        [..]
      </button>
      {isLoading && <h1>lodaing</h1>}
      {isError && error}
      {data && data?.data && (
        <EntityList
          entities={data.data.data}
          handleFolderClick={handleFolderClick}
          handleRename={handleRename}
        />
      )}
    </div>
  );
}

export default App;
