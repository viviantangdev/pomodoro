import React, { useState } from 'react';

const SettingsContext = React.createContext({});

export const SettingsProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
