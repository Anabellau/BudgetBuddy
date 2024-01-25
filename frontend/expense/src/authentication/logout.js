import { GoogleLogout } from 'react-google-login';

const clientId = "41880223738-so05f3a1o35bb5b1bjsva99p3g9c9u5i.apps.googleusercontent.com";

function LogoutButton() {
  const onLogoutSuccess = () => {
    console.log("Logout successful");
  }

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export { LogoutButton };
