import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navbar from "../Navbar";

const ManageReturns = () => {
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
