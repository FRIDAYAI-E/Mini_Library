import * as React from "react";
import { Toolbar, Typography } from "@mui/material";
import AppBar from "@material-ui/core/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { sessionAtom } from "./LoginPage";
import CssBaseline from "@mui/material/CssBaseline";

import Sidebar from "./Sidebar";

const userMenuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Dashboard",
    listLink: "/user/dashboard",
  },
  {
    listIcons: <SearchIcon />,
    listText: "BrowseBooks",
    listLink: "/browseBooks",
  },
];

const adminMenuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Admin Panel",
    listLink: "/admin/dashboard",
  },
  {
    listIcons: <ManageSearchIcon />,
    listText: "Manage Books",
    listLink: "/admin/managebooks",
  },
  {
    listIcons: <AddIcon />,
    listText: "Add Collection",
    listLink: "/admin/addcollection",
  },
  {
    listIcons: <KeyboardReturnIcon />,
    listText: "Books Returns",
    listLink: "/admin/managereturns",
  },
];

const allMenuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Admin Panel",
    listLink: "/admin/dashboard",
  },
  {
    listIcons: <ManageSearchIcon />,
    listText: "Manage Books",
    listLink: "/admin/managebooks",
  },
  {
    listIcons: <AddIcon />,
    listText: "Add Collection",
    listLink: "/admin/addcollection",
  },
  {
    listIcons: <KeyboardReturnIcon />,
    listText: "Books Returns",
    listLink: "/admin/managereturns",
  },
  {
    listIcons: <DashboardIcon />,
    listText: "Dashboard",
    listLink: "/user/dashboard",
  },
  {
    listIcons: <SearchIcon />,
    listText: "BrowseBooks",
    listLink: "/browseBooks",
  },
];

const activeRole = (users) => {
  if (users === "admin") {
    return adminMenuItems;
  } else if (users === "user") {
    return userMenuItems;
  } else if (users === "superuser") {
    return allMenuItems;
  }
};

export default function TemporaryDrawer() {
  const data = useAtom(sessionAtom)[0];
  // activeRole(data.loginUser);
  // console.log("Test", data);
  // console.log("Role", data?.loginUser?.role);
  return (
    <>
      <CssBaseline />
      {data.loginUser === undefined ? (
        <div />
      ) : (
        <AppBar position="static" style={{ background: "#999999" }}>
          <Toolbar>
            <Sidebar menuItem={activeRole(data.role)} className="potato" />
            <Typography
              variant="h6"
              component="h1"
              align="left"
              sx={{ flexGrow: 1 }}
            >
              aLibrary
            </Typography>
            <Typography>
              Today is the {format(new Date(), "do MMMM Y")}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
