import "./App.css";
import React from "react";
import { Route, Switch } from "react-router";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageBooks from "./components/admin/ManageBooks";
import BookUpdateCreate from "./components/admin/BookUpdateCreate";
import ManageReturns from "./components/admin/ManageReturns";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/">
          <Login />
        </Route> */}
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
  );
}

export default App;
