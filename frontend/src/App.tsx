import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Upload, UploadFile, UploadLink, UploadManual, UploadRevise, SupportUserGuide, Welcome, Home, SupportFeatureIdeas, SupportTips } from "./pages";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/file" element={<UploadFile />} />
          <Route path="/upload/link" element={<UploadLink />} />
          <Route path="/upload/manual" element={<UploadManual />} />
          <Route path="/upload/revise" element={<UploadRevise />} />
          <Route path="/support" element={<SupportUserGuide />} />
          <Route path="/support/supportfeatureideas" element={<SupportFeatureIdeas />} />
          <Route path="/support/supporttips" element={<SupportTips />} />
          <Route path="/welcome" element={<Welcome />} />
          
        </Routes>
      </div>
    </>
  );
}

export {App};