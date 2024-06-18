import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Academics, Upload, Clubs, Careers, Instructions, Welcome } from "./pages";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Academics from "./pages/Academics";
// import Upload from "./pages/Upload";
// import Clubs from "./pages/Clubs";
// import Careers from "./pages/Careers";
// import Instructions from "./pages/Instructions";
// import Welcome from "./pages/Welcome";
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

export {App};
