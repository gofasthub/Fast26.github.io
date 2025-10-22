import { useState } from 'react';
import { Save, FileText, Plus, FolderOpen } from 'lucide-react';

interface TextEditorProps {
  windowId: string;
  data?: { fileName?: string };
}

export function TextEditor({ windowId, data }: TextEditorProps) {
  const [content, setContent] = useState(data?.fileName 
    ? `# ${data.fileName}\n\nThis is a sample text file.\nYou can edit this content.`
    : '');
  const [fileName, setFileName] = useState(data?.fileName || 'untitled.txt');
  const [isSaved, setIsSaved] = useState(true);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Simulate save
    console.log('Saved:', fileName, content);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-200 text-sm transition-all duration-150 hover:scale-105">
          <Plus className="w-4 h-4" />
          New
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-200 text-sm transition-all duration-150 hover:scale-105">
          <FolderOpen className="w-4 h-4" />
          Open
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-200 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all duration-150 hover:scale-105"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="w-4 h-4" />
          <input
            type="text"
            value={fileName}
            onChange={(e) => { setFileName(e.target.value); setIsSaved(false); }}
            className="px-2 py-1 border rounded w-48 transition-all duration-150 focus:ring-2 focus:ring-blue-500"
          />
          {!isSaved && <span className="text-orange-500">• Unsaved</span>}
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 p-4 font-mono text-sm resize-none outline-none"
        placeholder="Start typing..."
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 border-t bg-gray-50 text-xs text-gray-600">
        <div>Lines: {content.split('\n').length}</div>
        <div>Characters: {content.length}</div>
        <div>UTF-8</div>
      </div>
    </div>
  );
}