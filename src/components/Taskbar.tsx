import { useState, useEffect } from 'react';
import { Grid3x3, Volume2, Wifi, Battery } from 'lucide-react';
import { AppWindow } from './Desktop';

interface TaskbarProps {
  windows: AppWindow[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  showStartMenu: boolean;
}

export function Taskbar({ windows, onStartClick, onWindowClick, showStartMenu }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur-md border-t border-white/10 flex items-center px-2 gap-2 shadow-2xl">
      {/* Start Button */}
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 ${
          showStartMenu ? 'bg-blue-600 scale-95' : 'hover:bg-white/10 hover:scale-105'
        }`}
        onClick={onStartClick}
      >
        <Grid3x3 className="w-5 h-5 text-white" />
        <span className="text-white">fast26</span>
      </button>

      <div className="w-px h-8 bg-white/20"></div>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows.map(window => (
          <button
            key={window.id}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-200 min-w-0 max-w-xs ${
              !window.isMinimized ? 'bg-white/20 scale-95' : 'hover:bg-white/10 hover:scale-105'
            }`}
            onClick={() => onWindowClick(window.id)}
          >
            <window.icon className="w-4 h-4 text-white flex-shrink-0" />
            <span className="text-white text-sm truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3 px-3">
        <Volume2 className="w-4 h-4 text-white cursor-pointer hover:text-blue-400 transition-all duration-150 hover:scale-110" />
        <Wifi className="w-4 h-4 text-white cursor-pointer hover:text-blue-400 transition-all duration-150 hover:scale-110" />
        <Battery className="w-4 h-4 text-white cursor-pointer hover:text-blue-400 transition-all duration-150 hover:scale-110" />
        <div className="w-px h-6 bg-white/20"></div>
        <div className="text-white text-sm">
          <div>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-xs text-white/70">{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
}