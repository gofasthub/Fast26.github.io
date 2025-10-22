import { Power, RotateCcw, Moon } from 'lucide-react';

interface StartMenuProps {
  apps: Array<{ id: string; name: string; icon: any }>;
  onAppClick: (appId: string) => void;
  onClose: () => void;
}

export function StartMenu({ apps, onAppClick, onClose }: StartMenuProps) {
  const handleAppClick = (appId: string) => {
    onAppClick(appId);
    onClose();
  };

  return (
    <div className="absolute bottom-14 left-2 w-96 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden">
      {/* User Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 hover:scale-110">
            <span className="text-white text-xl">U</span>
          </div>
          <div>
            <div className="text-white">User</div>
            <div className="text-white/70 text-sm">fast26 OS</div>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="p-4">
        <div className="text-white/50 text-xs mb-2">Applications</div>
        <div className="grid grid-cols-3 gap-2">
          {apps.map(app => (
            <button
              key={app.id}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group hover:scale-105"
              onClick={() => handleAppClick(app.id)}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-200">
                <app.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs text-center">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Power Options */}
      <div className="border-t border-white/10 p-2 flex gap-1">
        <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded hover:bg-white/10 transition-all duration-150 text-white text-sm">
          <Moon className="w-4 h-4" />
          Sleep
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded hover:bg-white/10 transition-all duration-150 text-white text-sm">
          <RotateCcw className="w-4 h-4" />
          Restart
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded hover:bg-red-600/20 transition-all duration-150 text-white text-sm hover:text-red-400">
          <Power className="w-4 h-4" />
          Shutdown
        </button>
      </div>
    </div>
  );
}