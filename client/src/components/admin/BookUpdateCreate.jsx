import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { sessionAtom } from "../LoginPage";

// import { rowAtom } from "./ManageBooks";

const BookUpdateCreate = (props) => {
  const { action } = props;
  let history = useHistory();
  const [status, setStatus] = useState("idle");
  const [genre, setGenre] = useState([]);
  const [submission, setSubmission] = useState({});

  const data = useAtom(sessionAtom)[0];

  const isAuthenticated = () => {
    if (data.loginUser === undefined) {
      history.push("/login");
    }
  };
  isAuthenticated();

  useEffect(async () => {
    setStatus("pending");
    const res = await axios.get("/api/book/genre");
    setStatus("resolved");
    console.log(res.data);
    setGenre(res.data);
  }, []);

  const { id } = useParams();

  useEffect(async () => {
    if (action === "UPDATE") {
      const res = await axios.get(`/api/book/${id}`);
      setSubmission(res.data);
    } else {
      setSubmission({ ...submission, genre: genre[0] });
    }
  }, [id, genre]);

  const handleChange = (e, field) => {
    e.preventDefault();
    setSubmission({ ...submission, [field]: e.target.value });
    console.log(e.target.value);
  };

  const createCollection = async (collectionObj) => {
    await axios
      .post("/api/book", collectionObj)
      .then((res) =>
        console.log(`New collection created successfully: ${res.data}`)
      )
      .catch((err) => {
        console.log(`createcollection err: ${err}`);
      });
  };

  const updateCollection = async (collectionObj) => {
    await axios
      .put(`/api/book/${id}`, collectionObj)
      .then((res) => console.log(`Update successful: ${res.data}`));
  };

  const handleSubmit = (apiMethod) => (e) => {
    e.preventDefault();
    apiMethod(submission);
    history.push("/admin/managebooks");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (
      confirm(
        "You are about to delete the selected collection. This action cannot be undone. Are you sure?"
      )
    ) {
      axios.delete(`/api/book/${id}`).then((res) => {
        alert(`${res.data} successfully deleted`);
        history.push("/admin/managebooks");
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Box className={action === "UPDATE" ? "" : "disabled"}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Book
        </Button>
      </Box>
      <Box className={status !== "pending" ? "disabled" : ""}>
        <CircularProgress />
      </Box>
      <Box
        sx={{
          mt: 8,
          width: "80%",
          padding: "0 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem auto",
        }}
        className={status === "pending" ? "disabled" : ""}
        component="form"
        onSubmit={
          action === "UPDATE"
            ? handleSubmit(updateCollection)
            : handleSubmit(createCollection)
        }
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              required
              label="title"
              name="title"
              autoFocus
              onChange={(e) => {
                handleChange(e, "title");
              }}
              value={submission.title}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              type="number"
              required
              label="Quantity"
              name="qty"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 0 } }}
              autoFocus
              min={0}
              onChange={(e) => {
                handleChange(e, "qty");
              }}
              value={submission.qty}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              required
              label="Image Url"
              name="bookImg"
              autoFocus
              onChange={(e) => {
                handleChange(e, "bookImg");
              }}
              value={submission.bookImg}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              required
              label="Author"
              name="author"
              autoFocus
              onChange={(e) => {
                handleChange(e, "author");
              }}
              value={submission.author}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="genre-selector">Genre</InputLabel>
            <Select
              fullWidth
              margin="normal"
              labelId="genre-selector"
              name="genre"
              label="genre"
              onChange={(e) => {
                handleChange(e, "genre");
              }}
              required
              value={submission.genre}
            >
              {genre.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              margin="normal"
              required
              label="Description"
              name="description"
              autoFocus
              onChange={(e) => {
                handleChange(e, "description");
              }}
              value={submission.description}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm
        </Button>
      </Box>
      <Box>
        <NavLink to={"/admin/managebooks"}>
          <Button>Cancel</Button>
        </NavLink>
      </Box>
    </div>
  );
};

export default BookUpdateCreate;

BookUpdateCreate.propTypes = {
  action: PropTypes.string,
};
