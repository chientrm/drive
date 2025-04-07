import { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useSearchParams,
} from "react-router-dom";
import "./index.css";

function FileBrowser() {
  const [files, setFiles] = useState([]);
  const [searchParams] = useSearchParams();
  const currentPath = searchParams.get("path") || "";

  useEffect(() => {
    fetch(`/drive/api/files?path=${encodeURIComponent(currentPath)}`)
      .then((res) => res.json())
      .then(setFiles)
      .catch((err) => console.error("Error fetching files:", err));
  }, [currentPath]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">File Browser</h1>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-400 mb-4">Current Path: {currentPath || "/"}</p>
        <ul className="space-y-2">
          {currentPath && (
            <li>
              <Link
                to={`?path=${encodeURIComponent(
                  currentPath.split("/").slice(0, -1).join("/")
                )}`}
                className="text-blue-400 hover:underline"
              >
                .. (Parent Directory)
              </Link>
            </li>
          )}
          {files.map((file) => (
            <li key={file.name}>
              {file.isDirectory ? (
                <Link
                  to={`?path=${encodeURIComponent(
                    currentPath ? `${currentPath}/${file.name}` : file.name
                  )}`}
                  className="text-blue-400 hover:underline"
                >
                  📁 {file.name}
                </Link>
              ) : (
                <span>📄 {file.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FileBrowser />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
