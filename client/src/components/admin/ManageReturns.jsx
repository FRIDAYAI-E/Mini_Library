import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router";

const ManageReturns = () => {
  let history = useHistory();
  const [loans, setLoans] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const getActiveLoans = async () => {
      const res = await axios.get("/api/onloan/active");
      console.log(res.data);
      setLoans(res.data);
    };
    getActiveLoans();
  }, []);

  const handleItemClick = (val) => {
    const currIndex = checked.indexOf(val);
    const newChecked = [...checked];
    if (currIndex === -1) {
      newChecked.push(val);
    } else {
      newChecked.splice(currIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleConfirm = () => {
    if (checked.length > 0) {
      // const removalIndex = [];
      for (const c of checked) {
        // removalIndex.push(loans.findIndex((l) => l._id === c));
        // console.log(`c is ${c}`);
        // console.log("loans: " + JSON.stringify(loans));
        // // console.log("Splice method: " + loans.map((l) => l._id).indexOf(c));
        // console.log("Find index: " + loans.findIndex((l) => l._id === c));
        // setLoans(loans.splice(loans.findIndex((l) => l._id === c)));
        axios
          .put(`/api/onloan/${c}`, { dateReturned: new Date() })
          .then((res) => {
            console.log(`updated ${res.data}`);
          });
      }
      history.push("/admin/dashboard");
      // removalIndex.sort((a, b) => b - a);
      // for (const i of removalIndex) {
      //   loans.splice(i, 1);
      // }
      // setLoans(loans);
    }
  };

  const populateList = loans.map((val) => (
    <ListItem key={val._id}>
      <ListItemButton onClick={() => handleItemClick(val._id)}>
        <ListItemIcon>
          <Checkbox edge="start" checked={checked.indexOf(val._id) !== -1} />
        </ListItemIcon>
        <ListItemText primary={val._id} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div>
      <Navbar />
      <Box>
        <List
          sx={{
            width: "60%",
            maxWidth: 360,
          }}
        >
          {populateList}
        </List>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </div>
  );
};

export default ManageReturns;
