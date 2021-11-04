import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import { Box, Button, LinearProgress } from "@mui/material";
import TableComponent from "../TableComponent";
import { sessionAtom } from "../LoginPage";
import { useAtom } from "jotai";
// import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";

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

// const StyledButton = withStyles({
//   root: {
//     backgroundColor: "#676767",
//     color: "#fff",
//     padding: "6px 12px",
//     "&:hover": {
//       backgroundColor: "#ABB2B9",
//       borderColor: "#ABB2B9",
//       boxShadow: "none",
//     },
//   },
// })(Button);

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
    <>
      <Navbar />
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} style={{ color: "primary" }}>
            <Grid item style={{ display: "flex" }}>
              <Button
                fullwidth
                variant="contained"
                onClick={() => {
                  history.push("/admin/managereturns");
                }}
              >
                Manage Return
              </Button>
            </Grid>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Button
                fullwidth
                variant="contained"
                onClick={() => {
                  history.push("/admin/managebooks");
                }}
              >
                Manage Books
              </Button>
            </Grid>
            <Grid item xs={12}>
              <React.Fragment>
                {/* <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Times Borrowed</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell>Loaned</TableCell>
                        <TableCell align="right">Collection Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {books.map((row, id) => (
                        <TableRow key={id}>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.genre}</TableCell>
                          <TableCell>{row.timesBorrowed}</TableCell>
                          <TableCell>{row.available}</TableCell>
                          <TableCell>{row.loaned}</TableCell>
                          <TableCell align="right">{row.qty}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table> */}
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
              </React.Fragment>
            </Grid>
          </Grid>
        </Container>
        {/* <StyledButton
          onClick={() => {
            history.push("/admin/managebooks");
          }}
          variant="contained"
        >
          Manage Books
        </StyledButton> */}
        {/* <StyledButton
          onClick={() => {
            history.push("/admin/managereturns");
          }}
          variant="contained"
        >
          Manage Returns
        </StyledButton> */}
      </Box>
      <Box className={status !== "pending" ? "disabled" : ""}>
        <LinearProgress />
      </Box>
      <Box className={status === "pending" ? "disabled" : ""}>
        {/* <TableComponent
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
        /> */}
      </Box>
    </>
  );
};

export default AdminDashboard;
