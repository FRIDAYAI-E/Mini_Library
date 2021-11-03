import * as React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { sessionAtom } from "./LoginPage";

import Sidebar from "./Sidebar";

const userMenuItems = [
  {
    listIcons: <SearchIcon />,
    listText: "BrowseBooks",
    listLink: "browseBook",
  },
];

const adminMenuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Admin Panel",
    listLink: "admin/dashboard",
  },
];

const allMenuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Admin Panel",
    listLink: "admin/dashboard",
  },
  {
    listIcons: <SearchIcon />,
    listText: "BrowseBooks",
    listLink: "browseBook",
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
  console.log("Test", data);
  console.log("Role", data?.loginUser?.role);
  return (
    <div>
      {data.loginUser === undefined ? (
        <div />
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Sidebar menuItem={activeRole(data.role)} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              aLibrary
            </Typography>
            <Typography>Welcome Back {data.loginUser.username}!</Typography>
            <Typography>
              Today is the {format(new Date(), "do MMMM Y")}
            </Typography>
            <Button color="inherit">
              <LogoutIcon />
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
