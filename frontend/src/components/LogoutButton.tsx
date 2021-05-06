import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logoutbutton = () => {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Log out
    </button>
  ) : null;
};

export default Logoutbutton;
