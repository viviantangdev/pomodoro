import { useContext, useEffect, useRef, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaGear, FaPause, FaPlay } from 'react-icons/fa6';
import SettingsContext from '../context/SettingsContext';

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds =
        (nextMode === 'work'
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 100);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === 'work'
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  const pathColor =
    mode === 'work' ? 'rgba(245,69,69,0.8)' : 'rgba(65,207,242,0.8)';

  return (
    <div className='flex flex-col justify-center items-center'>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={4}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: 'rgba(50,50,50,0.5)',
        })}
      >
        <p className='text-4xl'>{mode === 'work' ? '🍅' : '☕️'}</p>
        <p className='text-6xl mt-2'>{`${minutes}:${seconds}`}</p>
        <p className='font-light'>{mode === 'work' ? 'FOCUS' : 'BREAK'}</p>
        {isPaused ? (
          <button
            type='button'
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
            className='text-4xl mt-5'
          >
            <FaPlay />
          </button>
        ) : (
          <button
            type='button'
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
            className='text-4xl mt-5'
          >
            <FaPause />
          </button>
        )}
      </CircularProgressbarWithChildren>

      <button
        type='button'
        onClick={() => {
          setIsPaused(true);
          isPausedRef.current = true;
          settingsInfo.setShowSettings(true);
        }}
        className='flex justify-center items-center gap-1.5 mt-6 px-6 py-2 rounded-2xl border-black/50 dark:border-slate-50/10 border-2'
      >
        <FaGear />
        Settings
      </button>
    </div>
  );
};

export default Timer;
