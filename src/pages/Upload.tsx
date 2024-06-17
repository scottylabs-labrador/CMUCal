import React from "react";
import { useNavigate } from "react-router-dom";

const AcademicButton: React.FC = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/upload/file`; 
    navigate(path);
  }

  return (
    <button
      onClick={routeChange}
      className="rounded-[5px] border border-[#1F4C4C] bg-[#1F4C4C] px-14 py-2 text-white"
    >
      Academic
    </button>
  );

}

const ClubButton: React.FC = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/upload/file`; 
    navigate(path);
  }
  return (
    <button
      onClick={routeChange}
      className="rounded-[5px] border border-[#1F4C4C] px-14 py-2 text-[#1F4C4C]"
    >
      Club
    </button>
  );
};

const Upload: React.FC = () => {
  return (
    <div>
      <div className="text-black text-center font-bold font-sans text-4xl pt-48">
        <h1>Can't find an upcoming event?</h1>
        <h1>Add it to our database and help others find it!</h1>
        <h1>What would you like to upload today?</h1>
      </div>
      <div className="flex justify-center gap-40 py-20">
        <AcademicButton />
        <ClubButton />
      </div>
    </div>
  );
}

export {Upload};
