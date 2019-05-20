import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Header } from "semantic-ui-react";
import Login from "./pages/Login";
import Protest from "./pages/Protest";
import Admin from "./pages/Admin";

import apiAuth from "../api/auth";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Protest} />
        <Route path="/login" component={Login} />
        {apiAuth.isLoggedIn() ? (
          <Route path="/admin" component={Admin} />
        ) : (
          <Redirect to="/login" />
        )}
        <Route
          render={() => (
            <div>
              <Header as="h2" content="404" />
            </div>
          )}
        />
      </Switch>
    </div>
  );
}
