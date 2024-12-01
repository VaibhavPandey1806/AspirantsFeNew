import React, { useState, useEffect } from 'react';
import { Play, Pause, Timer as TimerIcon } from 'lucide-react';

interface QuestionTimerProps {
  onStart: () => void;
  onPause: () => void;
  onTick: (seconds: number) => void;
  isActive: boolean;
}

export default function QuestionTimer({ 
  onStart, 
  onPause, 
  onTick,
  isActive 
}: QuestionTimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTick(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, onTick]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg shadow-sm px-4 py-2">
      <TimerIcon size={20} className="text-gray-500" />
      <span className="font-mono text-lg">{formatTime(time)}</span>
      <button
        onClick={isActive ? onPause : onStart}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        {isActive ? (
          <Pause size={20} className="text-red-500" />
        ) : (
          <Play size={20} className="text-green-500" />
        )}
      </button>
    </div>
  );
}