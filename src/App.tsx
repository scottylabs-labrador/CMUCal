import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Academics, Upload, Clubs, Careers, Instructions, Welcome, UploadEdit } from "./pages";
import {UploadAcademics} from "./pages/UploadAcademics";
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
          <Route path="/" element={<Welcome />} />
          <Route path="/home/academics" element={<Academics />} />
          <Route path="/home/clubs" element={<Clubs />} />
          <Route path="/home/career" element={<Careers />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/academics" element={<UploadAcademics />} />
          {/* <Route path="/upload/file" element={<UploadFile />} /> */}
          <Route path="/upload/edit" element={<UploadEdit />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </>
  );
}

export {App};
