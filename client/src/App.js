import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageBooks from "./components/admin/ManageBooks";
import BookUpdateCreate from "./components/admin/BookUpdateCreate";
import ManageReturns from "./components/admin/ManageReturns";
import UserDashboard from "./components/users/UserDashboard";
import BrowseBooks from "./components/users/BrowseBooks";
import BookDetails from "./components/users/BookDetails";
import SuccessBooking from "./components/users/SuccessBooking";
import NewUser from "./components/users/NewUser";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route exact path="/">
          <Login />
        </Route> */}
          {
            //!      ====================    Admin routes  =========================
          }
          <Route path="/login">
            <LoginPage />
          </Route>

          {
            //!      ====================    Admin routes  =========================
          }

          <Route path="/admin/dashboard">
            <AdminDashboard />
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
          <Route path="/admin/addcollection">
            <BookUpdateCreate />
          </Route>
          {
            //!?     ====================    User routes  =========================
          }
          <Route path="/user/new">
            <NewUser />
          </Route>
          <Route path="/user/dashboard">
            <UserDashboard />
          </Route>
          <Route path="/browseBooks/:id">
            <BookDetails />
          </Route>
          <Route path="/browseBooks">
            <BrowseBooks />
          </Route>
          <Route path="/books/success">
            <SuccessBooking />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
