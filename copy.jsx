import { useRef, useState } from 'react';

const SESSION_TYPE = {
  WORKING: 'Working',
  BREAK: 'Break',
};
const BREAK_TYPE = {
  SHORT: 'short',
  LONG: 'long',
};

function App() {
  const pomodoroMinutes = 0.1;
  const shortBreakMinutes = 0.05;
  const longBreakMinutes = 0.2;

  const [sessionType, setSessionType] = useState(SESSION_TYPE.WORKING);
  const [pomodoroLeft, setPomodoroLeft] = useState(pomodoroMinutes * 60);
  const [breakType, setBreakType] = useState(BREAK_TYPE.SHORT);
  const [breakLeft, setBreakLeft] = useState(shortBreakMinutes * 60);
  const [count, setCount] = useState(0);

  const intervalRef = useRef(null);

  const formatTime = (timeLeft) => {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(Math.floor(timeLeft % 60)).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const beginWork = () => {
    setSessionType(SESSION_TYPE.WORKING);
    setPomodoroLeft(pomodoroMinutes * 60);
  };

  const handleBreak = (afterCount) => {
    const isLong = afterCount % 4 === 0;
    const dur = (isLong ? longBreakMinutes : shortBreakMinutes) * 60;
    setBreakType(isLong ? BREAK_TYPE.LONG : BREAK_TYPE.SHORT);
    setBreakLeft(dur);
    setSessionType(SESSION_TYPE.BREAK);
  };

  // ----- ticking intervals -----
  const startWorkInterval = () => {
    clearTick();
    intervalRef.current = setInterval(() => {
      setPomodoroLeft((prev) => {
        if (prev <= 1) {
          clearTick();
          setCount((c) => {
            const updated = c + 1;
            handleBreak(updated);
            if (updated % 4 === 0) {
              startLongBreakInterval();
            } else {
              startBreakInterval();
            }
            return updated;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startBreakInterval = () => {
    clearTick();
    intervalRef.current = setInterval(() => {
      setBreakLeft((prev) => {
        if (prev <= 1) {
          clearTick();
          beginWork();
          startWorkInterval();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startLongBreakInterval = () => {
    clearTick();
    intervalRef.current = setInterval(() => {
      setBreakLeft((prev) => {
        if (prev <= 1) {
          clearTick();
          console.log('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ----- UI actions -----
  const startTimer = () => {
    if (intervalRef.current) return; // already running
    if (sessionType === SESSION_TYPE.WORKING) {
      setPomodoroLeft((v) => (v <= 0 ? pomodoroMinutes * 60 : v));
      startWorkInterval();
    } else {
      setBreakLeft((v) => {
        if (v <= 1) {
          const dur =
            (breakType === BREAK_TYPE.LONG
              ? longBreakMinutes
              : shortBreakMinutes) * 60;
          return dur;
        }
        return v;
      });
      if (breakType === BREAK_TYPE.LONG) {
        startLongBreakInterval();
      } else {
        startBreakInterval();
      }
    }
  };

  const pauseTimer = () => {
    clearTick();
  };

  return (
    <>
      <h1>Pomodoro</h1>
      <p>
        Session: <strong>{sessionType}</strong>
        {sessionType === SESSION_TYPE.BREAK && `(${breakType.toLowerCase()})`}
      </p>
      <div className='timer-display'>
        <p>
          {sessionType === SESSION_TYPE.WORKING
            ? formatTime(pomodoroLeft)
            : formatTime(breakLeft)}
        </p>
      </div>
      <div className='buttons'>
        <button type='button' onClick={startTimer}>
          Start
        </button>
        <button type='button' onClick={pauseTimer}>
          Pause
        </button>
      </div>
      <span>Count: {count}</span>
    </>
  );
}

export default App;
