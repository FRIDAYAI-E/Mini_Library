import React from "react";
import Navbar from "../Navbar";
import { Box, Button } from "@mui/material";
import TableComponent from "../TableComponent";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <Box>
        <Button variant="contained">Manage Books</Button>
        <Button variant="contained">Manage Returns</Button>
      </Box>
      <Box>
        <TableComponent />
      </Box>
    </div>
  );
};

export default AdminDashboard;
