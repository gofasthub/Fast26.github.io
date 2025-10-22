import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Share2 } from 'lucide-react';

interface ImageViewerProps {
  data?: { fileName?: string };
}

export function ImageViewer({ data }: ImageViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom(Math.min(200, zoom + 10));
  const handleZoomOut = () => setZoom(Math.max(50, zoom - 10));
  const handleRotate = () => setRotation((rotation + 90) % 360);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700 bg-gray-800">
        <div className="text-white text-sm">{data?.fileName || 'image.jpg'}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded hover:bg-gray-700 text-white transition-all duration-150 hover:scale-110"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-white text-sm w-12 text-center">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded hover:bg-gray-700 text-white transition-all duration-150 hover:scale-110"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-700"></div>
          <button
            onClick={handleRotate}
            className="p-2 rounded hover:bg-gray-700 text-white transition-all duration-150 hover:scale-110"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 text-white transition-all duration-150 hover:scale-110">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 text-white transition-all duration-150 hover:scale-110">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Display */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4">
        <div
          className="bg-gray-700 rounded-lg flex items-center justify-center text-white transition-transform"
          style={{
            width: `${zoom * 4}px`,
            height: `${zoom * 3}px`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <div className="text-lg">Sample Image</div>
            <div className="text-sm text-gray-400">{data?.fileName || 'image.jpg'}</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-700 bg-gray-800 text-sm text-gray-400">
        <div>1920 × 1080 pixels</div>
        <div>JPEG • 3.2 MB</div>
      </div>
    </div>
  );
}