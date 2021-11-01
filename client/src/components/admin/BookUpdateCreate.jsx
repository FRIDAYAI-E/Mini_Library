import { Button, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";

const BookUpdateCreate = () => {
  const [genre, setGenre] = useState(["Fiction", "Non fiction"]);
  useEffect(() => {
    setGenre(["Fiction", "Non fiction"]);
  }, []);

  const handleSelection = () => {};

  return (
    <div>
      <Navbar />
      <Box>
        <Button variant="contained" color="error">
          Delete Book
        </Button>
        {/* //! ADD CONFIRMATION */}
      </Box>
      <Box component="form">
        <TextField required label="Title"></TextField>
        <Select label="Genre" value={genre} onChange={handleSelection}>
          map menuitem(genre)
        </Select>
        <TextField required label="Quantity"></TextField>
        <TextField label="ImageUrl"></TextField>
        <TextField label="Author"></TextField>
      </Box>
    </div>
  );
};

export default BookUpdateCreate;
