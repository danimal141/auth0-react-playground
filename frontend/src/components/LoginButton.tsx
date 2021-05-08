import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Use passwordless
  // const login = () => loginWithRedirect({ connectionType: 'passwordless' });
  const login = () => loginWithRedirect();
  return !isAuthenticated ? <button onClick={login}>Log in</button> : null;
};

export default LoginButton;
