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
import LogoutPage from "./components/LogoutPage";
import HomePage from "./components/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#264653",
    },
    secondary: {
      main: "#f4a261",
    },
    surface: {
      main: "#FFFFFF",
    },
    error: {
      main: "#C51162",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path="/">
          <Login />
        </Route> */}
            {
              //*      ====================    All routes  =========================
            }
            <Route exact path="/">
              <HomePage />
            </Route>

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
              <BookUpdateCreate action="UPDATE" />
            </Route>
            <Route path="/admin/managebooks">
              <ManageBooks />
            </Route>
            <Route path="/admin/addcollection">
              <BookUpdateCreate action="CREATE" />
            </Route>
            <Route path="/admin/managereturns">
              <ManageReturns />
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
            {
              //!      ====================    General routes  =========================
            }
            <Route path="/logout">
              <LogoutPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
