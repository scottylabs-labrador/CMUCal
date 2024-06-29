import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UploadNavBar: React.FC = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const redirectTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className="bg-green w-full h-4/6 mt-20 text-white flex gap-44 justify-center items-center text-xl py-4">
            <div className={`cursor-pointer ${location.pathname === '/upload/file' ? 'text-teal font-medium' : 'text-white'}`} onClick={() => redirectTo('/upload/file')}>
                Upload File
            </div>
            <div className={`cursor-pointer ${location.pathname === '/upload/link' ? 'text-teal font-medium' : 'text-white'}`} onClick={() => redirectTo('/upload/link')}>
                Upload Link
            </div>
            <div className={`cursor-pointer ${location.pathname === '/upload/manual' ? 'text-teal font-medium' : 'text-white'}`} onClick={() => redirectTo('/upload/manual')}>
                Upload Manually
            </div>
        </div>
    );
};

const UploadButton: React.FC = () => {
    let navigate = useNavigate();
    const routeChange = () => {
      let path = `/upload/revise`;
      navigate(path);
    };
  
    return (
      <button
        onClick={routeChange}
        className="w-[94px] h-[40px] rounded-md bg-teal text-white text-base text-center flex items-center justify-center"      >
        Upload
      </button>
    );
  };
  

export { UploadNavBar, UploadButton };