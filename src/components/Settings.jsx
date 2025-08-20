import { useContext, useState } from 'react';
import 'react-range-slider-input/dist/style.css';
import SettingsContext from '../context/SettingsContext';
const Settings = () => {
  const settingsInfo = useContext(SettingsContext);

  const [newBreakMinues, setNewBreakMinutes] = useState(
    settingsInfo.breakMinutes
  );
  const [newWorkMinutes, setNewWorkMinutes] = useState(
    settingsInfo.workMinutes
  );

  function handleSave() {
    settingsInfo.setWorkMinutes(newWorkMinutes);
    settingsInfo.setBreakMinutes(newBreakMinues);
  }

  return (
    <div className='flex flex-col space-x-2'>
      <div>
        <label>Work minutes: </label>
        <input
          type='number'
          min={1}
          value={newWorkMinutes}
          onChange={(e) => setNewWorkMinutes(e.target.value)}
        />
      </div>

      <div>
        <label>Break minutes: </label>
        <input
          type='number'
          min={1}
          value={newBreakMinues}
          onChange={(e) => setNewBreakMinutes(e.target.value)}
        />
      </div>
      <div>
        {' '}
        <button type='button' onClick={handleSave}>
          Save
        </button>
        <button
          type='button'
          onClick={() => settingsInfo.setShowSettings(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
