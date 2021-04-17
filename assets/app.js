import React, { useState } from "react";
import ReactDom from "react-dom";
import NavBar from "./js/components/Navbar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import "./styles/app.css";
import "./styles/bootstrap.min.css";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from "./js/components/PrivateRoute";
import CustomerPage from "./js/pages/CustomerPage";
import InvoicePage from "./js/pages/InvoicePage";
/* import "./bootstrap"; */

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavbarWithRouter = withRouter(NavBar);

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavbarWithRouter
        /* Plus besoin grâce au context */
        /*         isAuthenticated={isAuthenticated}
          onLogout={setIsAuthenticated} */
        />
        <main className="container pt-5">
          <Switch>
            <Route
              path="/login"
              /* Plus besoin avec le context */
              /*   render={(props) => (
                <LoginPage onLogin={setIsAuthenticated} {...props} />
              )} */
              /* On revient à une syntaxte plus courte  */
              component={LoginPage}
            />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute
              path="/customers"
              /* IDEM */
              /*               isAuthenticated={isAuthenticated}
               */
              component={CustomersPage}
            />

            <PrivateRoute path="/invoices/:id" component={InvoicePage} />

            <PrivateRoute
              path="/invoices"
              /* IDEM */
              /*               isAuthenticated={isAuthenticated}
               */
              component={InvoicesPage}
            />

            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement);
