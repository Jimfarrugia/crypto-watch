import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import GlobalStyles from "./styles/GlobalStyles";
import { light, dark } from "./styles/theme";

const App = React.lazy(() => import("./App"));
const SignIn = React.lazy(() => import("./components/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const Account = React.lazy(() => import("./components/Account"));
const Notifications = React.lazy(() => import("./components/Notifications"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));
const PageNotFound = React.lazy(() => import("./components/PageNotFound"));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider
          theme={localStorage.getItem("theme") === "light" ? light : dark}
        >
          <GlobalStyles />
          <Layout>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <PrivateRoute path="/account" component={Account} />
                <Route path="/notifications" component={Notifications} />
                {/* // TODO - ^ make private */}
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
