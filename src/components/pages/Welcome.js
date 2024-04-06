import React from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function Welcome() {
  return (
    <>
    <div>
      <h1>Welcome</h1>
    </div>
    <div>
        <GoogleOAuthProvider clientId="<1066229695792-t2vimjbc2fvchulss1jh1ui7joaiqni2.apps.googleusercontent.com>">
          <GoogleLogin
            buttonText='Sign in'
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            } }
            onError={() => {
              console.log('Login Failed');
            } }
            cookiePolicy={'single_host_origin'}
            responseType='code'
            successType='offline'
            scope='openid email profile https://www.googleapis.com/auth/calendar' />;
        </GoogleOAuthProvider>;
    </div>
    </>

  )
}

export default Welcome
