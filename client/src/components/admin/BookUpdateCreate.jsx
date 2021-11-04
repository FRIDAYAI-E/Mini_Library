import { Button, CircularProgress } from "@mui/material";
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
      <Box className={status === "pending" ? "disabled" : ""}>
        <form
          onSubmit={
            action === "UPDATE"
              ? handleSubmit(updateCollection)
              : handleSubmit(createCollection)
          }
        >
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => {
              handleChange(e, "title");
            }}
            required
            value={submission.title}
          />
          <select
            name="genre"
            id="genre"
            onChange={(e) => {
              handleChange(e, "genre");
            }}
            required
            value={submission.genre}
          >
            {genre.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="qty"
            id="input-qty"
            placeholder="Quantity"
            onChange={(e) => {
              handleChange(e, "qty");
            }}
            required
            min={0}
            value={submission.qty}
          />
          <input
            type="text"
            name="bookImg"
            placeholder="Image Url"
            onChange={(e) => {
              handleChange(e, "bookImg");
            }}
            value={submission.bookImg}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={(e) => {
              handleChange(e, "author");
            }}
            required
            value={submission.author}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => {
              handleChange(e, "description");
            }}
            value={submission.description}
          />
          <input type="submit" value="Confirm" />
        </form>
      </Box>
      <NavLink to={"/admin/managebooks"}>
        <Button>Cancel</Button>
      </NavLink>
    </div>
  );
};

export default BookUpdateCreate;

BookUpdateCreate.propTypes = {
  action: PropTypes.string,
};
