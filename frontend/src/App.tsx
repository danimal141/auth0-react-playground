import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CurrentUser from "./pages/CurrentUser";
import PrivateRoute from "./components/PrivateRoute";
import AuthorizedProvider from "./lib/AuthorizedProvider";

function App(): JSX.Element {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={`${window.location.origin}/mypage`}
    >
      <AuthorizedProvider>
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/mypage" component={CurrentUser} />
          </Switch>
        </BrowserRouter>
      </AuthorizedProvider>
    </Auth0Provider>
  );
}

export default App;
