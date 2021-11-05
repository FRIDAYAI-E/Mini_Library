import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Box, Button } from "@mui/material";
import TableComponent from "../TableComponent";
import { sessionAtom } from "../LoginPage";
import { useAtom } from "jotai";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
//import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";

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

function AdminDashboard() {
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

  console.log(status);

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
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                style={{ background: "primary" }}
                fullwidth
                variant="contained"
                onClick={() => {
                  history.push("/admin/managebooks");
                }}
              >
                Manage Books
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
          </Grid>
        </Box>
        <TableComponent
          title="Books Overview"
          columns={columns}
          data={books}
          options={{
            pageSize: 10,
            rowStyle: {
              fontSize: 12,
            },
          }}
          click={rowClick}
        />
        {/* <div>
              <h1 className="login"> Login page </h1>
              <form onSubmit={handleSubmit}>
                <input name="username" placeholder="username" />
                <input name="password" placeholder="Password" />
                <button>Login</button>
              </form>
              {networkStatus === "error" ? (
                <div>
                  <h1>Incorrect login details. Please try again</h1>
                </div>
              ) : null}
            </div> */}
        {/* <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/user/new" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {networkStatus === "error" ? (
              <div>
                <h1>Incorrect login details. Please try again</h1>
              </div>
            ) : null} */}
        {/* </Box> */}
        {/* <div>
              <NavLink to="/user/new">
                <p>Create a new user</p>
              </NavLink>
            </div> */}
      </Container>
    </>
    //     return (
    //         <div>
    //         <h1 className="login"> Login page </h1>
    //         <form onSubmit={handleSubmit}>
    //         <input name="username" placeholder="username" />
    //         <input name="password" placeholder="Password" />
    //         <button>Login</button>
    //       </form>
    //       {networkStatus === "error" ? (
    //         <div>
    //           <h5>Incorrect login details. Please try again</h5>
    //         </div>
    //       ) : null}
    //         </div>
  );
}

export default AdminDashboard;
