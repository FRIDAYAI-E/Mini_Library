import React from "react";
import Navbar from "../Navbar";
import { Box, Button } from "@mui/material";
import TableComponent from "../TableComponent";
// import NumberFormatter from "../NumberFormatter";
// import DateFormatter from "../DateFormatter";

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
      {/* <NumberFormatter
        inputVal={100000}
        thousandsSeperated={true}
        decimalPlaces={2}
      />
      <div>
        <DateFormatter date={new Date()} format="dd-MMM-yyyy" />
      </div> */}
    </div>
  );
};

export default AdminDashboard;
