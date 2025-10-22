import { useEffect, useState } from 'react';
import { AlertTriangle, Skull, X } from 'lucide-react';

interface VirusOverlayProps {
  onReset: () => void;
}

export function VirusOverlay({ onReset }: VirusOverlayProps) {
  const [stage, setStage] = useState(0);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [errorMessages, setErrorMessages] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Stage progression
    const stageTimer = setInterval(() => {
      setStage(s => Math.min(s + 1, 4));
    }, 2000);

    // Glitch effect
    const glitchTimer = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 100);

    // Spawn random error windows
    const errorTimer = setInterval(() => {
      setErrorMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 200),
        }
      ]);
    }, 500);

    return () => {
      clearInterval(stageTimer);
      clearInterval(glitchTimer);
      clearInterval(errorTimer);
    };
  }, []);

  const glitchStyle = {
    filter: `hue-rotate(${glitchIntensity * 360}deg) saturate(${1 + glitchIntensity * 2})`,
    transform: `translate(${(Math.random() - 0.5) * glitchIntensity * 10}px, ${(Math.random() - 0.5) * glitchIntensity * 10}px)`,
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Stage 1: Warning */}
      {stage >= 0 && (
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black p-6 rounded-lg shadow-2xl animate-in zoom-in-50 duration-500 pointer-events-auto"
          style={stage >= 2 ? glitchStyle : {}}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <div>
              <div className="font-bold">WARNING: VIRUS DETECTED!</div>
              <div className="text-sm">System integrity compromised...</div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Screen corruption */}
      {stage >= 2 && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)',
            animation: 'glitch 0.3s infinite',
          }} />
        </div>
      )}

      {/* Stage 3: Multiple error windows */}
      {stage >= 3 && errorMessages.map((error, i) => (
        <div
          key={error.id}
          className="absolute bg-gray-800 border-2 border-red-500 rounded-lg p-4 shadow-2xl animate-in zoom-in-95 duration-200 pointer-events-auto"
          style={{ 
            left: error.x, 
            top: error.y,
            animation: 'shake 0.5s infinite',
          }}
        >
          <div className="flex items-start gap-2 text-white">
            <X className="w-5 h-5 text-red-500" />
            <div className="text-sm">
              <div className="font-bold">CRITICAL ERROR #{Math.floor(Math.random() * 9999)}</div>
              <div className="text-xs text-red-400">System failure imminent</div>
            </div>
          </div>
        </div>
      ))}

      {/* Stage 4: BSOD */}
      {stage >= 4 && (
        <div className="absolute inset-0 bg-blue-600 flex items-center justify-center animate-in fade-in duration-1000 pointer-events-auto">
          <div className="text-white max-w-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <Skull className="w-16 h-16" />
              <div>
                <h1 className="text-4xl mb-2">:(</h1>
                <h2 className="text-2xl">Your OS ran into a problem</h2>
              </div>
            </div>
            <p className="mb-4">
              fast26 OS encountered a critical error and needs to restart.
            </p>
            <p className="text-sm mb-6 opacity-80">
              Error code: 0x000000VIRUS_ATTACK_DETECTED
            </p>
            <p className="text-sm mb-8 opacity-80">
              If this is the first time you've seen this error, you probably clicked on a suspicious link
              in the browser. If you continue to see this error, try not clicking on obvious viruses.
            </p>
            <div className="mb-4">
              <div className="text-sm mb-2">Collecting error info: 100% complete</div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-full"></div>
              </div>
            </div>
            <button
              onClick={onReset}
              className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Restart System (Clean Virus)
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
