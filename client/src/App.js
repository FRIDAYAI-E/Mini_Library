import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageBooks from "./components/admin/ManageBooks";
import BookUpdateCreate from "./components/admin/BookUpdateCreate";
import ManageReturns from "./components/admin/ManageReturns";
import BrowseBooks from "./components/users/BrowseBooks";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route exact path="/">
          <Login />
        </Route> */}
          <Route path="/user/browse">
            <BrowseBooks />
          </Route>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>
          <Route exact path="/admin/managebooks/new">
            <BookUpdateCreate />
          </Route>
          <Route path="/admin/managebooks/:id/edit">
            <BookUpdateCreate />
          </Route>
          <Route path="/admin/managebooks">
            <ManageBooks />
          </Route>
          <Route path="/admin/managereturns">
            <ManageReturns />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
