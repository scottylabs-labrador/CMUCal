import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/pages/Home";
import Academics from "./components/pages/Academics";
import Upload from "./components/pages/Upload";
import Clubs from "./components/pages/Clubs";
import Careers from "./components/pages/Careers";
import Instructions from "./components/pages/Instructions";
import Welcome from "./components/pages/Welcome";
import "./App.css";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;
