import { useState } from 'react';
import logo from './assets/sling.png';
import EntityList from './components/EntityList';
import { IEntity } from './constants/types';

const ROOT_DIR = "C:\\";

const DUMMY_DATA: IEntity[] = [
  { name: "apps", isDirectory: true },
  { name: "docs", isDirectory: true },
  { name: "contacts.txt", isDirectory: false },
  { name: "students.json", isDirectory: false },
]

function App() {
  const [path, setPath] = useState<string[]>([ROOT_DIR]);

  return (
    <div style={{ minHeight: "100vh", width: "100vw" }}>
      <div>
        <img src={logo} alt="" width={200} height={200 / 3.61} />
      </div>
      <div>
        <h1>Current path: {path.join("")}</h1>
      </div>
      <div>
        <EntityList entities={DUMMY_DATA} />
      </div>
    </div>
  );
}

export default App;
