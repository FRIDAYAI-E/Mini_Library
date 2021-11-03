import * as React from "react";
import {
  Avatar,
  Divider,
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import { NavLink } from "react-router-dom";

const standardItems = [
  {
    listIcons: <LogoutIcon />,
    listText: "Logout",
    listLink: "logout",
  },
  {
    listIcons: <HelpIcon />,
    listText: "Help",
    listLink: "logout",
  },
];

export default function sidebar(props) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Avatar alt="User" />
      <Divider />
      <List>
        {props.menuItem.map((element, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{element.listIcons}</ListItemIcon>
            <ListItemText
              primary={
                <NavLink to={`${element.listLink}`}>{element.listText}</NavLink>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {standardItems.map((element, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{element.listIcons}</ListItemIcon>
            <ListItemText primary={element.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Button
          onClick={toggleDrawer("right", true)}
          style={{ color: "white" }}
        >
          <MenuIcon />
        </Button>
        <Drawer
          anchor="left"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
