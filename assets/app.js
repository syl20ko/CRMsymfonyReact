import React from "react";
import ReactDom from "react-dom";
import NavBar from "./js/components/Navbar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
import { HashRouter, Switch, Router, Route } from "react-router-dom";
import "./styles/app.css";
import "./styles/bootstrap.min.css";
import InvoicesPage from "./js/pages/InvoicesPage";
/* import "./bootstrap"; */

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <main className="container pt-5">
        <Switch>
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement);
