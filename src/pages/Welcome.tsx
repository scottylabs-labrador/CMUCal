import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleSigninButton() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/home/academics`;
    navigate(path);
  }

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          routeChange();
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

const About: React.FC = () => {
  return (
    <div className="bg-[#E7E2CF] p-6 rounded-lg shadow-md w-1/2">
      <h3 className="text-xl font-medium mb-4 font-serif font-source-serif-pro">
        About
      </h3>
      <p>
        CMUCal offers convenient search for academic resources and events on
        campus, with the option of adding events to your personal Google
        Calendar.
      </p>
    </div>
  );
};

const Video: React.FC = () => {
  return (
    <div className="border p-6 rounded-lg shadow-md w-1/2">
      <p className="text-xl font-medium mb-4 font-serif font-source-serif-pro">
        Video Tutorial
      </p>
    </div>
  );
};

function Welcome() {
  // Code to do after logging in
  const handleClick = () => { };

  return (
    <>
      <div className="h-4/5 bg-lightgrey text-center">
        <h1 className="text-black font-serif font-source-serif-pro text-[80px] font-normal leading-normal pt-28">
          Welcome to CMUCal
        </h1>
        <h2 className="text-black font-serif font-source-serif-pro text-[35px] font-normal leading-normal mb-12">
          the all-in-one CMU resources platform
        </h2>
        <div className="flex justify-center gap-8 pb-14">
          <GoogleSigninButton />
        </div>
      </div>

      <div className="flex justify-around px-10 py-6 gap-8">
        <About />
        <Video />
      </div>
    </>
  );
}

export { Welcome };