import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import UserDetailsPage from "./pages/UserDetailsPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route path="/" exact>
          <UsersPage />
        </Route>
        <Route path="/user/:login" exact>
          <UserDetailsPage />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
