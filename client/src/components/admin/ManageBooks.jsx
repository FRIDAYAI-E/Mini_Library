import { Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import TableComponent from "../TableComponent";
import { NavLink } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { sessionAtom } from "../LoginPage";

const columns = [
  {
    field: "title",
    title: "Title",
    align: "justify",
    defaultSort: "asc",
  },
  {
    field: "author",
    title: "Author",
    align: "justify",
  },

  {
    field: "genre",
    title: "Genre",
    align: "justify",
  },
];

export const rowAtom = atom("");

const ManageBooks = () => {
  const data = useAtom(sessionAtom)[0];
  let history = useHistory();

  const isAuthenticated = () => {
    if (data.loginUser === undefined) {
      history.push("/login");
    }
  };
  isAuthenticated();

  const [status, setStatus] = useState("idle");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    setStatus("pending");
    const getBooks = async () => {
      const res = await axios.get("/api/book");
      setStatus("resolved");
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
          sx={{
            "&:hover": {
              backgroundColor: "#ABB2B9",
              borderColor: "#ABB2B9",
              boxShadow: "none",
            },
          }}
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
      <Box className={status !== "pending" ? "disabled" : ""}>
        <LinearProgress />
      </Box>
      <Box className={status === "pending" ? "disabled" : ""}>
        <TableComponent
          title="Books Collection"
          columns={columns}
          data={books}
          options={{
            pageSize: 10,
            rowStyle: {
              fontSize: 15,
            },
          }}
          click={clickHandler}
        />
      </Box>
      <NavLink to={"/admin/dashboard"}>
        <Button>Back</Button>
      </NavLink>
    </div>
  );
};

export default ManageBooks;
