// import logo from './logo.svg';
import { useState } from "react";
import Navbar from "./components/Navbar";
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Upload from "./pages/Upload";
import Clubs from "./pages/Clubs";
import Careers from "./pages/Careers";
import SecondNav from "./components/SecondNav";
import Instructions from "./pages/Instructions";
import Welcome from "./pages/Welcome";

// Parts of the code were taken from https://www.youtube.com/watch?v=I2UBjN5ER4s
// React Router documentation: https://reactrouter.com/en/main/start/tutorial

function App() {
	const [search, setSearch] = useState("");
	return (
		<div className="rootContainer">
			<Navbar />

			<SecondNav />
			<div className="appContainer">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/academics" element={<Academics />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="/instructions" element={<Instructions />} />
					<Route path="/search/academics" element={<Academics />} />
					<Route path="/search/clubs" element={<Clubs />} />
					<Route path="/search/career" element={<Careers />} />
					<Route path="/welcome" element={<Welcome />} />
				</Routes>
			</div>
		</div>

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
