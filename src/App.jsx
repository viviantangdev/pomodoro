import { useState } from 'react';
import Settings from './components/Settings';
import Timer from './components/Timer';
import SettingsContext from './context/SettingsContext';

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(2);
  return (
    <>
      <h1>Pomodoro</h1>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        <Timer />
        <Settings />
      </SettingsContext.Provider>
    </>
  );
}

export default App;
