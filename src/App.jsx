import { useContext } from 'react';
import Modal from './components/Modal';
import Settings from './components/Settings';
import Timer from './components/Timer';
import Footer from './components/Footer';
import SettingsContext, { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <>
      <SettingsProvider>
        <main>
          <AppContent />
        </main>
        <Footer/>
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
