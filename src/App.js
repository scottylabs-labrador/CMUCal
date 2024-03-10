// import logo from './logo.svg';
import { useState } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

// Parts of the code were taken from https://www.youtube.com/watch?v=I2UBjN5ER4s

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact />
      </Routes>
    </Router>
    </>

    // <div className="App">
    //   <div>
    //     <input value={search} onChange={(e) => setSearch(e.target.value)}>
    //     </input>
    //     <button></button>
    //   </div>
    //   </div>
    

      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello Radixweb</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
    
  );
}

export default App;
