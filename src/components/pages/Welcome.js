import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function GoogleSigninButton() {
  return (
    <>
        <GoogleLogin
          buttonText="Sign in"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          cookiePolicy={"single_host_origin"}
          responseType="code"
          successType="offline"
          scope="openid email profile https://apis.google.com/js/platform.js"
        />
    </>
  );
}

const GuestSigninButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-[5px] border border-[#1F4C4C] px-14 py-2 text-[#1F4C4C]"
    >
      Continue as Guest
    </button>
  );
};

const About = () => {
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

// Placeholder for the video section
const Video = () => {
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
  const handleClick = () => {};

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
          <GuestSigninButton onClick={handleClick} />
        </div>
      </div>

      <div className="flex justify-around px-10 py-6 gap-8">
        <About />
        <Video />
      </div>
    </>
  );
}

export default Welcome;
