import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
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
            <Route component={PageNotFound} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
