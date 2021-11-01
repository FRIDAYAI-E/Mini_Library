import React from "react";
import { NavLink } from "react-router-dom";
// import BrowseBooks from './BrowseBooks';
import UserDueTable from "./UserDueTable";
import UserFines from "./UserFines";

function userDashboard() {
  return (
    <>
      <div>
        <NavLink to={"/api/books/all"}>
          <button>Browse Books!</button>
        </NavLink>
        <UserDueTable />
        {/* <BrowseBooks /> */}
        <UserFines />
      </div>
    </>
  );
}

export default userDashboard;
