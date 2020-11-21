import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import UserDetailsPage from "./pages/UserDetailsPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Route path="/" exact>
            <UsersPage />
          </Route>
          <Route path="/user/:login" exact>
            <UserDetailsPage />
          </Route>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
