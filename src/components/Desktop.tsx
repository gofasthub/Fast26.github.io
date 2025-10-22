import { useState, useRef } from 'react';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { StartMenu } from './StartMenu';
import { ContextMenu } from './ContextMenu';
import { VirusOverlay } from './VirusOverlay';
import { Terminal } from './apps/Terminal';
import { FileManager } from './apps/FileManager';
import { TextEditor } from './apps/TextEditor';
import { Calculator } from './apps/Calculator';
import { Settings } from './apps/Settings';
import { Browser } from './apps/Browser';
import { ImageViewer } from './apps/ImageViewer';
import { MusicPlayer } from './apps/MusicPlayer';
import { 
  Terminal as TerminalIcon, 
  FolderOpen, 
  FileText, 
  Calculator as CalcIcon, 
  Settings as SettingsIcon,
  Globe,
  Image as ImageIcon,
  Music
} from 'lucide-react';

export interface AppWindow {
  id: string;
  type: string;
  title: string;
  icon: any;
  component: React.ComponentType<any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data?: any;
}

export function Desktop() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [virusActive, setVirusActive] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const apps = [
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon, component: Terminal },
    { id: 'files', name: 'File Manager', icon: FolderOpen, component: FileManager },
    { id: 'editor', name: 'Text Editor', icon: FileText, component: TextEditor },
    { id: 'calculator', name: 'Calculator', icon: CalcIcon, component: Calculator },
    { id: 'browser', name: 'Web Browser', icon: Globe, component: Browser },
    { id: 'images', name: 'Image Viewer', icon: ImageIcon, component: ImageViewer },
    { id: 'music', name: 'Music Player', icon: Music, component: MusicPlayer },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, component: Settings },
  ];

  const openApp = (appId: string, data?: any) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const existingWindow = windows.find(w => w.type === appId && !data);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      }
      return;
    }

    const newWindow: AppWindow = {
      id: `${appId}-${Date.now()}`,
      type: appId,
      title: app.name,
      icon: app.icon,
      component: app.component,
      position: { 
        x: 100 + (windows.length * 30), 
        y: 80 + (windows.length * 30) 
      },
      size: appId === 'calculator' 
        ? { width: 320, height: 420 }
        : { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
      data,
    };

    setWindows([...windows, newWindow]);
    setHighestZIndex(highestZIndex + 1);
    setShowStartMenu(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setHighestZIndex(newZIndex);
  };

  const toggleMinimize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      setShowStartMenu(false);
      setContextMenu(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setShowStartMenu(false);
  };

  const triggerVirus = () => {
    setVirusActive(true);
  };

  return (
    <div 
      ref={desktopRef}
      className={`relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-all duration-300 ${
        virusActive ? 'animate-pulse' : ''
      }`}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat"></div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {apps.slice(0, 4).map(app => (
          <button
            key={app.id}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-all duration-200 hover:scale-105 group"
            onDoubleClick={() => openApp(app.id)}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200 group-hover:shadow-lg">
              <app.icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs px-2 py-0.5 bg-black/30 rounded backdrop-blur-sm">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onMinimize={() => toggleMinimize(window.id)}
          onMaximize={() => toggleMaximize(window.id)}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        >
          <window.component 
            windowId={window.id} 
            data={window.data} 
            openApp={openApp}
            triggerVirus={window.type === 'browser' ? triggerVirus : undefined}
          />
        </Window>
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-200">
          <StartMenu apps={apps} onAppClick={openApp} onClose={() => setShowStartMenu(false)} />
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div className="animate-in fade-in zoom-in-95 duration-150">
          <ContextMenu 
            position={contextMenu} 
            onClose={() => setContextMenu(null)}
            openApp={openApp}
          />
        </div>
      )}

      {/* Virus Overlay */}
      {virusActive && <VirusOverlay onReset={() => setVirusActive(false)} />}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onWindowClick={toggleMinimize}
        showStartMenu={showStartMenu}
      />
    </div>
  );
}