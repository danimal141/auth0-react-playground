import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <LoginButton />
      {isAuthenticated && (
        <>
          <div>
            <LogoutButton />
          </div>
          <nav>
            <Link to="/">Home | </Link>
            <Link to="/mypage">Mypage</Link>
          </nav>
        </>
      )}
    </div>
  );
};

export default NavBar;
