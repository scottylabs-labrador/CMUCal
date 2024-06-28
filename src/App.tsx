import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Academics, Clubs, Careers, Upload, UploadFile, UploadLink, UploadInput, Instructions, Welcome } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home/academics" element={<Academics />} />
          <Route path="/home/clubs" element={<Clubs />} />
          <Route path="/home/career" element={<Careers />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/file" element={<UploadFile />} />
          <Route path="/upload/link" element={<UploadLink />} />
          <Route path="/upload/input" element={<UploadInput />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </>
  );
}

export {App};
