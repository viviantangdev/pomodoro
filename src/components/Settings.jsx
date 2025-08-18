import { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';

const Settings = () => {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div className='flex flex-col space-x-2'>
      <label>work minutes: {settingsInfo.workMinutes}</label>

      <label>break minutes: {settingsInfo.breakMinutes}</label>
      <button type="button" onClick={() => settingsInfo.setShowSettings(false)}>Back</button>
    </div>
  );
};

export default Settings;
