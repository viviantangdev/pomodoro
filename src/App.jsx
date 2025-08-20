import { useContext } from 'react';
import Modal from './components/Modal';
import Settings from './components/Settings';
import Timer from './components/Timer';
import SettingsContext, { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <>
      <h1>Pomodoro</h1>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </>
  );
}

export default App;

function AppContent() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <>
      <Timer />
      {settingsInfo.showSettings ? (
        <Modal onClick={()=> settingsInfo.setShowSettings(false)}>
          <Settings />
        </Modal>
      ) : null}
    </>
  );
}
