import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GoogleSigninButton: React.FC = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = `/home/academics`;
    navigate(path);
  }

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);

    if (credentialResponse.credential) {
      try {
        const response = await axios.post('http://localhost:5000/api/google-login', {
          token: credentialResponse.credential,
        });

        console.log(response.data);
        console.log("Log in successful");
        routeChange();
      } catch (error) {
        console.error("Login failed", error);
      }
    } else {
      console.error("No credential provided");
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export default GoogleSigninButton;
