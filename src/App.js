
import './App.css';
import MultiCounter from './components/MultiCounter';
import Notes from './components/Notes';
import { GlobalContextProvider } from './context/Global';

function App() {
  return (
    <div className="app">
      <div className="app__title">GLOBAL CONTEXT</div>
      <GlobalContextProvider>
          <MultiCounter number={3} />
          <Notes />
      </GlobalContextProvider>
      <div className="app__title">MULTI CONTEXT</div>
      
    </div>

  );
}

export default App;
