import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router";
import axios from "axios";

const BookUpdateCreate = () => {
  let history = useHistory();
  const [genre, setGenre] = useState([]);
  const [submission, setSubmission] = useState({});
  useEffect(async () => {
    const res = await axios.get("/api/book/genre");
    setGenre(res.data);
  }, []);

  const handleChange = (e, field) => {
    e.preventDefault();
    setSubmission({ ...submission, [field]: e.target.value });
    console.log(e.target.value);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log(submission);
    axios
      .post("/api/book", submission)
      .then(console.log(`New collection created successfully`));
    history.push("/admin/managebooks");
  };

  return (
    <div>
      <Navbar />
      <Box>
        <Button variant="contained" color="error">
          Delete Book
        </Button>
        {/* //! ADD CONFIRMATION */}
      </Box>
      <FormControl type="paper">
        <TextField
          required
          label="Title"
          onChange={(e) => {
            handleChange(e, "title");
          }}
        ></TextField>
        {/* <InputLabel id="genre-label">Genre</InputLabel> */}
        <Select
          label="genre"
          value={genre?.[0]}
          onChange={(e) => {
            handleChange(e, "genre");
          }}
        >
          {genre.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          label="Quantity"
          onChange={(e) => {
            handleChange(e, "qty");
          }}
        ></TextField>
        <TextField
          label="ImageUrl"
          onChange={(e) => {
            handleChange(e, "bookImg");
          }}
        ></TextField>
        <TextField
          label="Author"
          onChange={(e) => {
            handleChange(e, "author");
          }}
        ></TextField>
        <TextField
          label="Description"
          onChange={(e) => {
            handleChange(e, "description");
          }}
        ></TextField>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button
          onClick={() => {
            history.push("/admin/managebooks");
          }}
        >
          Cancel
        </Button>
      </FormControl>
    </div>
  );
};

export default BookUpdateCreate;
