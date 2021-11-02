import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAtom } from "jotai";
import { rowAtom } from "./ManageBooks";

const BookUpdateCreate = () => {
  let history = useHistory();
  const [row] = useAtom(rowAtom);
  const [genre, setGenre] = useState([]);
  // const [submission, setSubmission] = useState({});

  useEffect(async () => {
    const res = await axios.get("/api/book/genre");
    console.log(res.data);
    setGenre(res.data);
  }, []);

  // const handleChange = (e, field) => {
  //   e.preventDefault();
  //   setSubmission({ ...submission, [field]: e.target.value });
  //   console.log(e.target.value);
  // };
  const createCollection = (collectionObj) => {
    axios
      .post("/api/book", collectionObj)
      .then(console.log(`New collection created successfully`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {};
    result.title = e.target.title.value;
    result.genre = e.target.genre.value;
    result.qty = e.target.qty.value;
    result.bookImg = e.target.bookImg.value;
    result.author = e.target.author.value;
    result.description = e.target.description.value;
    console.log("create collection", result);
    createCollection(result);
    history.push("/admin/managebooks");
  };

  return (
    <div>
      <Navbar />
      <Box>
        {row === null ? (
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
            value={row ? row.title : ""}
          />
          <select name="genre" id="genre" value={row ? row.genre : ""}>
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
            value={row ? row.qty : ""}
          />
          <input
            type="text"
            name="bookImg"
            placeholder="Image Url"
            value={row ? row.bookImg : ""}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={row ? row.author : ""}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={row ? row.description : ""}
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
