import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";
// import "./index.css";

const App = React.lazy(() => import("./App"));
const SignIn = React.lazy(() => import("./components/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const Account = React.lazy(() => import("./components/Account"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout>
            <React.Suspense fallback={<div className="loader" />}>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <PrivateRoute path="/account" component={Account} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route component={PageNotFound} />
              </Switch>
            </React.Suspense>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
