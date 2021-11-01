import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navbar from "../Navbar";
import TableComponent from "../TableComponent";

const ManageBooks = () => {
  const handleAddBook = () => {};

  return (
    <div>
      <Navbar />
      <Box>
        <Button variant="contained" onClick={handleAddBook}>
          Add Book
        </Button>
      </Box>
      <Box>
        <TextField
          id="manage-books-search"
          label="Outlined"
          variant="outlined"
        />
        <TableComponent />
        <Button variant="outlined">Back</Button>
      </Box>
    </div>
  );
};

export default ManageBooks;
