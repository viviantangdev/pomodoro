import Settings from './components/Settings';
import Timer from './components/Timer';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <>
      <h1>Pomodoro</h1>
      <SettingsProvider>
        <Timer />
        <Settings />
      </SettingsProvider>
    </>
  );
}

export default App;
