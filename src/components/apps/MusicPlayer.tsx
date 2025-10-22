import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface MusicPlayerProps {
  data?: { fileName?: string };
}

export function MusicPlayer({ data }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes
  const [volume, setVolume] = useState(70);

  const playlist = [
    { title: 'Summer Breeze', artist: 'Demo Artist', album: 'Demo Album', duration: '3:24' },
    { title: 'Midnight Dreams', artist: 'Demo Artist', album: 'Demo Album', duration: '4:12' },
    { title: 'Digital Sunset', artist: 'Demo Artist', album: 'Demo Album', duration: '3:45' },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(t => Math.min(t + 1, duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((currentTrack + 1) % playlist.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          <div className="w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
            <div className="text-8xl">🎵</div>
          </div>
          {isPlaying && (
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="text-center px-8 pb-4">
        <h2 className="text-2xl mb-1">{playlist[currentTrack].title}</h2>
        <p className="text-purple-200">{playlist[currentTrack].artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pb-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseInt(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-purple-200 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{playlist[currentTrack].duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pb-6">
        <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-150 hover:scale-110">
          <Shuffle className="w-5 h-5" />
        </button>
        <button onClick={handlePrevious} className="p-3 hover:bg-white/10 rounded-full transition-all duration-150 hover:scale-110">
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-4 bg-white text-purple-900 rounded-full hover:scale-105 transition-all duration-200 active:scale-95"
        >
          {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>
        <button onClick={handleNext} className="p-3 hover:bg-white/10 rounded-full transition-all duration-150 hover:scale-110">
          <SkipForward className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-150 hover:scale-110">
          <Repeat className="w-5 h-5" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 px-8 pb-6">
        <Volume2 className="w-5 h-5" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm w-10">{volume}%</span>
      </div>

      {/* Playlist */}
      <div className="border-t border-white/10 bg-black/20 p-4 max-h-48 overflow-y-auto">
        <div className="text-sm text-purple-200 mb-2">Playlist</div>
        {playlist.map((track, i) => (
          <button
            key={i}
            onClick={() => setCurrentTrack(i)}
            className={`w-full text-left px-3 py-2 rounded hover:bg-white/10 transition-colors ${
              i === currentTrack ? 'bg-white/10' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm">{track.title}</div>
                <div className="text-xs text-purple-200">{track.artist}</div>
              </div>
              <div className="text-sm text-purple-200">{track.duration}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}