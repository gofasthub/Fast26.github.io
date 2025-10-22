import { useEffect, useRef } from 'react';
import { Terminal, FolderOpen, FileText, Settings, RefreshCw } from 'lucide-react';

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  openApp: (appId: string) => void;
}

export function ContextMenu({ position, onClose, openApp }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 py-1 min-w-[200px]"
      style={{ left: position.x, top: position.y }}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-white text-sm transition-all duration-150"
        onClick={() => handleAction(() => openApp('terminal'))}
      >
        <Terminal className="w-4 h-4" />
        Open Terminal
      </button>
      <button
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-white text-sm transition-all duration-150"
        onClick={() => handleAction(() => openApp('files'))}
      >
        <FolderOpen className="w-4 h-4" />
        Open File Manager
      </button>
      <button
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-white text-sm transition-all duration-150"
        onClick={() => handleAction(() => openApp('editor'))}
      >
        <FileText className="w-4 h-4" />
        New Text File
      </button>
      <div className="border-t border-white/10 my-1"></div>
      <button
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-white text-sm transition-all duration-150"
        onClick={() => handleAction(() => {})}
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
      <button
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-white text-sm transition-all duration-150"
        onClick={() => handleAction(() => openApp('settings'))}
      >
        <Settings className="w-4 h-4" />
        Display Settings
      </button>
    </div>
  );
}