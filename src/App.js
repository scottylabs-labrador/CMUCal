import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./components/pages/Home.tsx";
import Academics from "./components/pages/Academics.tsx";
import Upload from "./components/pages/Upload.tsx";
import Clubs from "./components/pages/Clubs.tsx";
import Careers from "./components/pages/Careers.tsx";
import Instructions from "./components/pages/Instructions.tsx";
import Welcome from "./components/pages/Welcome.tsx";
import "./App.css";

function App() {
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
