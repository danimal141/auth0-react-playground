import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignUpButton: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // Use passwordless
  // const signUp = () => loginWithRedirect({ mode: "signUp", connectionType: 'passwordless' });
  const signUp = () => loginWithRedirect({ mode: "signUp" });

  return !isAuthenticated ? <button onClick={signUp}>SignUp</button> : null;
};

export default SignUpButton;
