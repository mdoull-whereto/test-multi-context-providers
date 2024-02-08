
import './App.css';
import MultiCounter from './components/MultiCounter';
import Notes from './components/Notes';
import { GlobalContextProvider } from './context/global/Global';
import MultiProvider from './context/multi/MultiProvider';
import MultiCounterWithSeparateState from './components/MultiCounterWithSeparateState'
import NotesWithSeparateState from './components/NotesWithSeparateState'

function App() {
  return (
    <div className="app">
      <div className="app__title">GLOBAL CONTEXT</div>
      <GlobalContextProvider>
        <MultiCounter number={3} />
        <Notes />
      </GlobalContextProvider>
      <div className="app__title">MULTI CONTEXT</div>
      <MultiProvider>
        <MultiCounterWithSeparateState number={3} />
        <NotesWithSeparateState />
      </MultiProvider>
    </div>

  );
}

export default App;
