import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import TableComponent from "../TableComponent";
import { NavLink } from "react-router-dom";
import { atom, useAtom } from "jotai";

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

export const rowAtom = atom("");

const ManageBooks = () => {
  let history = useHistory();

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/api/book");
      setBooks(res.data);
    };
    getBooks();
  }, []);

  const [row, setRow] = useAtom(rowAtom);

  const clickHandler = (e, rowData) => {
    setRow(rowData);
    console.log("Row click", rowData);
    history.push(`/admin/managebooks/${rowData._id}/edit`);
  };

  return (
    <div>
      <Navbar />
      <Box>
        <Button
          onClick={() => {
            setRow(null);
            console.log(row);
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
      <NavLink to={"/admin/dashboard"}>
        <Button>Back</Button>
      </NavLink>
    </div>
  );
};

export default ManageBooks;
