import { useRef, useEffect, useState } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { AppWindow } from './Desktop';

interface WindowProps {
  window: AppWindow;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  onUpdateSize: (id: string, size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export function Window({
  window,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onUpdateSize,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100));
        onUpdatePosition(window.id, { x: newX, y: newY });
      } else if (isResizing && !window.isMaximized) {
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
          const newWidth = Math.max(300, e.clientX - rect.left);
          const newHeight = Math.max(200, e.clientY - rect.top);
          onUpdateSize(window.id, { width: newWidth, height: newHeight });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, window.id, window.isMaximized, window.position, onUpdatePosition, onUpdateSize]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 48px)' }
    : {
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{ ...style, zIndex: window.zIndex }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <window.icon className="w-4 h-4" />
          <span className="text-sm">{window.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="hover:bg-white/20 p-1 rounded transition-all duration-150 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            className="hover:bg-white/20 p-1 rounded transition-all duration-150 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            {window.isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            className="hover:bg-red-500 p-1 rounded transition-all duration-150 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize group"
          onMouseDown={handleResizeMouseDown}
        >
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gray-400 group-hover:border-blue-500 transition-colors"></div>
        </div>
      )}
    </div>
  );
}