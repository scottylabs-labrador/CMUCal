import React from 'react'
import './Welcome.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const GuestSigninButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      title="Continue as a Guest"
    >
      Continue as Guest
    </button>
  );
};

function GoogleSigninButton() {
  return (
    <>
      <GoogleOAuthProvider clientId="<1066229695792-3nui1uf9nrlc1ukjrjqup716trqovq1m.apps.googleusercontent.com>">
        <GoogleLogin
          buttonText='Sign in'
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          cookiePolicy={'single_host_origin'}
          responseType='code'
          successType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar' />;
      </GoogleOAuthProvider>;
    </>
  )
}

const About = () => {
  return (
    <>
      <div id="About">
        <p>About</p>
        <p>CMUCal offers convenient search for academic resources and events on campus, with the option of adding events to your personal Google Calendar.</p>
      </div>
    </>
  );
};

// Insert Video later
const Video = () => {
  return (
    <>
      <div id="Video">
        <p>Video</p>
      </div>
    </>
  )
}

function Welcome() {
  // Code to do after logging in
  const handleClick = () => {

  };

  return (
    <>
      <div className = 'welcome-upper'>
        <h1>Welcome to CMU Cal</h1>
        <h2>the all-in-one CMU resources platform</h2>
        <div className="loginButtons">
          <GoogleSigninButton />
          <GuestSigninButton onClick={handleClick} text="Continue as a Guest" />
        </div>
      </div>

      <div className = 'welcome-lower'>
        <About/>
        <Video />
      </div>
    </>

  )
}

export default Welcome
