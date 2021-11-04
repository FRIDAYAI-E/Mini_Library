import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navbar from "../Navbar";
import { sessionAtom } from "../LoginPage"
import { useAtom } from 'jotai'
import { useHistory } from "react-router";


const ManageReturns = () => {
  const data = useAtom(sessionAtom)[0]
  let history = useHistory()

  const isAuthenticated = () => {
    if(data.loginUser === undefined) {
      history.push("/login");
    }
  }
  isAuthenticated()

  
  return (
    <div>
      <Navbar />
      <Box component="form">
        <TextField required label="loan id"></TextField>
        <Button variant="contained">Confirm</Button>
      </Box>
    </div>
  );
};

export default ManageReturns;
