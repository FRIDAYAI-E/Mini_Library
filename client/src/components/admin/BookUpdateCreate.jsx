import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
// import { useAtom } from "jotai";
// import { rowAtom } from "./ManageBooks";

const BookUpdateCreate = (props) => {
  const { action } = props;
  let history = useHistory();
  // const [row] = useAtom(rowAtom);
  const [genre, setGenre] = useState([]);
  const [submission, setSubmission] = useState({});
  // const [entry, setEntry] = useState({});

  useEffect(async () => {
    const res = await axios.get("/api/book/genre");
    console.log(res.data);
    setGenre(res.data);
  }, []);

  const { id } = useParams();

  useEffect(async () => {
    if (action === "UPDATE") {
      const res = await axios.get(`/api/book/${id}`);
      setSubmission(res.data);
    }
  }, [id]);

  const handleChange = (e, field) => {
    e.preventDefault();
    setSubmission({ ...submission, [field]: e.target.value });
    console.log(e.target.value);
  };

  const createCollection = (collectionObj) => {
    console.log(`createCol: ${JSON.stringify(collectionObj)}`);
    axios
      .post("/api/book", collectionObj)
      .then((res) =>
        console.log(`New collection created successfully: ${res.data}`)
      )
      .catch((err) => {
        console.log(`createcollection err: ${err}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCollection(submission);
    history.push("/admin/managebooks");
  };

  return (
    <div>
      <Navbar />
      <Box>
        {action === "CREATE" ? (
          ""
        ) : (
          <Button variant="contained" color="error">
            Delete Book
          </Button>
        )}
        {/* //! ADD CONFIRMATION */}
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => {
              handleChange(e, "title");
            }}
            value={submission.title}
          />
          <select
            name="genre"
            id="genre"
            onChange={(e) => {
              handleChange(e, "genre");
            }}
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
