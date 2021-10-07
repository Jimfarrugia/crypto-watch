import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import App from "./App";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import ResetPassword from "./components/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <PrivateRoute path="/account" component={Account} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
