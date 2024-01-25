import { GoogleLogin } from 'react-google-login';

const clientId = "41880223738-so05f3a1o35bb5b1bjsva99p3g9c9u5i.apps.googleusercontent.com";

function LoginButton() {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! CURRENT USER:", res.profileObj);
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILED! ", res);
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export { LoginButton };
