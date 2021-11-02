import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import TableComponent from "../TableComponent";

const columns = [
  {
    field: "title",
    title: "Title",
    align: "justify",
    defaultSort: "asc",
  },
  {
    field: "genre",
    title: "Genre",
    align: "justify",
  },
];

const ManageBooks = () => {
  let history = useHistory();

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/api/book");
      setBooks(res.data);
      console.log(res);
    };
    getBooks();
  }, []);

  // const handleAddBook = () => {};

  const clickHandler = (e, rowData) => {
    console.log("Row click", rowData);
  };

  return (
    <div>
      <Navbar />
      <Box>
        <Button
          onClick={() => {
            history.push("/admin/addcollection");
          }}
          variant="contained"
        >
          Add New Collection
        </Button>
      </Box>
      <TableComponent
        title="Books Collection"
        columns={columns}
        data={books}
        options={{ pageSize: 10 }}
        click={clickHandler}
      />
      <Button
        onClick={() => {
          history.push("/admin/dashboard");
        }}
        variant="outlined"
      >
        Back
      </Button>
    </div>
  );
};

export default ManageBooks;
