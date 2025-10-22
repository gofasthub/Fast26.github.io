import { useState } from 'react';
import { Folder, File, ChevronRight, Home, HardDrive, ArrowLeft, ArrowRight } from 'lucide-react';

interface FileManagerProps {
  windowId: string;
  openApp?: (appId: string, data?: any) => void;
}

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
}

export function FileManager({ windowId, openApp }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [history, setHistory] = useState<string[][]>([['Home']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const fileStructure: Record<string, FileItem[]> = {
    'Home': [
      { name: 'Documents', type: 'folder' },
      { name: 'Downloads', type: 'folder' },
      { name: 'Pictures', type: 'folder' },
      { name: 'Music', type: 'folder' },
      { name: 'Videos', type: 'folder' },
    ],
    'Home/Documents': [
      { name: 'notes.txt', type: 'file', size: '2.4 KB', modified: '2025-10-20' },
      { name: 'readme.md', type: 'file', size: '1.2 KB', modified: '2025-10-19' },
      { name: 'project', type: 'folder' },
    ],
    'Home/Downloads': [
      { name: 'file1.pdf', type: 'file', size: '524 KB', modified: '2025-10-22' },
      { name: 'archive.zip', type: 'file', size: '12.5 MB', modified: '2025-10-21' },
    ],
    'Home/Pictures': [
      { name: 'vacation.jpg', type: 'file', size: '3.2 MB', modified: '2025-10-15' },
      { name: 'screenshot.png', type: 'file', size: '856 KB', modified: '2025-10-22' },
    ],
    'Home/Music': [
      { name: 'song1.mp3', type: 'file', size: '4.2 MB', modified: '2025-10-10' },
      { name: 'playlist.m3u', type: 'file', size: '1 KB', modified: '2025-10-12' },
    ],
    'Home/Videos': [
      { name: 'video1.mp4', type: 'file', size: '45.3 MB', modified: '2025-10-18' },
    ],
  };

  const currentFiles = fileStructure[currentPath.join('/')] || [];

  const navigate = (path: string[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigate([...currentPath, item.name]);
    } else {
      // Open file in appropriate app
      if (item.name.endsWith('.txt') || item.name.endsWith('.md')) {
        openApp?.('editor', { fileName: item.name });
      } else if (item.name.endsWith('.jpg') || item.name.endsWith('.png')) {
        openApp?.('images', { fileName: item.name });
      } else if (item.name.endsWith('.mp3')) {
        openApp?.('music', { fileName: item.name });
      }
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate(['Home'])}
          className="p-2 rounded hover:bg-gray-200"
        >
          <Home className="w-4 h-4" />
        </button>
        <div className="flex-1 flex items-center gap-1 px-3 py-1 bg-white border rounded">
          <HardDrive className="w-4 h-4 text-gray-500" />
          {currentPath.map((segment, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400" />}
              <button
                onClick={() => navigate(currentPath.slice(0, i + 1))}
                className="text-sm hover:underline"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r bg-gray-50 p-2">
          <div className="text-xs text-gray-500 mb-2">Quick Access</div>
          <button
            onClick={() => navigate(['Home'])}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-200 text-sm transition-all duration-150"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          {['Documents', 'Downloads', 'Pictures', 'Music', 'Videos'].map(folder => (
            <button
              key={folder}
              onClick={() => navigate(['Home', folder])}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-200 text-sm transition-all duration-150"
            >
              <Folder className="w-4 h-4 text-blue-500" />
              {folder}
            </button>
          ))}
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr>
                <th className="text-left px-4 py-2 text-sm">Name</th>
                <th className="text-left px-4 py-2 text-sm">Size</th>
                <th className="text-left px-4 py-2 text-sm">Modified</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50 cursor-pointer border-b transition-colors duration-150"
                  onDoubleClick={() => handleItemClick(item)}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {item.type === 'folder' ? (
                        <Folder className="w-5 h-5 text-blue-500" />
                      ) : (
                        <File className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {item.type === 'file' ? item.size : '--'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {item.modified || '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}