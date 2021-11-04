import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import { Box, Button, LinearProgress } from "@mui/material";
import TableComponent from "../TableComponent";
import { sessionAtom } from "../LoginPage";
import { useAtom } from "jotai";
import { withStyles } from "@mui/styles";

// import faker from "faker";
// import NumberFormatter from "../NumberFormatter";
// import DateFormatter from "../DateFormatter";

const columns = [
  {
    field: "title",
    title: "Title",
    align: "justify",
    defaultSort: "desc",
  },
  {
    field: "genre",
    title: "Genre",
    align: "justify",
  },
  {
    field: "timesBorrowed",
    title: "Times Borrowed",
    align: "center",
  },
  {
    field: "available",
    title: "Available",
    align: "center",
  },
  {
    field: "loaned",
    title: "Loaned",
    align: "center",
  },
  {
    field: "qty",
    title: "Collection Total",
    align: "center",
  },
];

const StyledButton = withStyles({
  root: {
    backgroundColor: "#676767",
    color: "#fff",
    padding: "6px 12px",
    "&:hover": {
      backgroundColor: "#ABB2B9",
      borderColor: "#ABB2B9",
      boxShadow: "none",
    },
  },
})(Button);

const AdminDashboard = () => {
  const [status, setStatus] = useState("idle");
  const [books, setBooks] = useState([]);

  const data = useAtom(sessionAtom)[0];
  let history = useHistory();

  const isAuthenticated = () => {
    if (data.loginUser === undefined) {
      history.push("/login");
    }
  };
  isAuthenticated();

  useEffect(() => {
    const getBooks = async () => {
      setStatus("pending");
      const res = await axios.get("/api/admin/dashboard");
      setStatus("resolved");
      const data = res.data.map((d) => ({
        title: d.title,
        genre: d.genre,
        timesBorrowed: d.timesBorrowed,
        available: d.available,
        loaned: d.loaned,
        qty: d.qty,
      }));
      setBooks(data);
    };
    getBooks();
  }, []);

  const rowClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <Navbar />
      <Box>
        <StyledButton
          onClick={() => {
            history.push("/admin/managebooks");
          }}
          variant="contained"
        >
          Manage Books
        </StyledButton>
        <StyledButton
          onClick={() => {
            history.push("/admin/managereturns");
          }}
          variant="contained"
        >
          Manage Returns
        </StyledButton>
      </Box>
      <Box className={status !== "pending" ? "disabled" : ""}>
        <LinearProgress />
      </Box>
      <Box className={status === "pending" ? "disabled" : ""}>
        <TableComponent
          title="Books Overview"
          columns={columns}
          data={books}
          options={{
            pageSize: 10,
            rowStyle: {
              fontSize: 15,
            },
          }}
          click={rowClick}
        />
      </Box>
    </div>
  );
};

export default AdminDashboard;
