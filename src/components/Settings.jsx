import { useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import SettingsContext from '../context/SettingsContext';

const Settings = () => {
  const settingsInfo = useContext(SettingsContext);

  function handleWorkIncrement() {
    settingsInfo.setWorkMinutes(Number(settingsInfo.workMinutes) + 1);
  }

  function handleWorkDecrement() {
    settingsInfo.setWorkMinutes(Number(settingsInfo.workMinutes) - 1);
  }
  function handleBreakIncrement() {
    settingsInfo.setBreakMinutes(Number(settingsInfo.breakMinutes) + 1);
  }

  function handleBreakDecrement() {
    settingsInfo.setBreakMinutes(Number(settingsInfo.breakMinutes) - 1);
  }

  return (
    <div className='flex flex-col gap-3.5 '>
      <h2 className='font-bold uppercase'>Settings</h2>
      <div className='flex flex-col gap-y-8'>
        <div className='flex flex-col gap-4'>
          <label className='w-full'>Work minutes: </label>
          <div>
            <button
              type='button'
              onClick={handleWorkDecrement}
              className='px-1 py-1 sm:px-4 sm:py-2 rounded-2xl border-black/50 dark:border-slate-50/10 border-2'
            >
              -
            </button>
            <input
              type='number'
              value={settingsInfo.workMinutes}
              onChange={(e) => settingsInfo.setWorkMinutes(e.target.value)}
              className='text-center outline-none border-none focus:outline-none focus:border-none w-10 px-2'
            />
            <button
              type='button'
              onClick={handleWorkIncrement}
              className='px-1 py-1 sm:px-4 sm:py-2 rounded-2xl border-black/50 dark:border-slate-50/10 border-2'
            >
              +
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <label className='w-full'>Break minutes: </label>
          <div>
            <button
              type='button'
              onClick={handleBreakDecrement}
              className='px-1 py-1 sm:px-4 sm:py-2 rounded-2xl border-black/50 dark:border-slate-50/10 border-2'
            >
              -
            </button>
            <input
              type='number'
              value={settingsInfo.breakMinutes}
              onChange={(e) => settingsInfo.setBreakMinutes(e.target.value)}
              className='text-center outline-none border-none focus:outline-none focus:border-none w-10 px-2'
            />
             <button
              type='button'
              onClick={handleBreakIncrement}
              className='px-1 py-1 sm:px-4 sm:py-2 rounded-2xl border-black/50 dark:border-slate-50/10 border-2'
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className='absolute top-2 right-2 z-10'>
        <button
          type='button'
          onClick={() => settingsInfo.setShowSettings(false)}
        >
          <IoCloseOutline size={25} />
        </button>
      </div>
    </div>
  );
};

export default Settings;
