import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

function NewUser() {
  const [status, setStatus] = useState("start");
  let history = useHistory();

  const createNewUser = async (newUser) => {
    await axios.post("/api/user", newUser).then((res) => {
      if (res.data) {
        null;
      } //empty code to prevent errors
    });
  };

  const checkUser = async (user) => {
    await axios
      .post("/api/user/check", { username: user.username, email: user.email })
      .then((res) => {
        if (res.data[0] === undefined) {
          setStatus("available");
          createNewUser({
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role,
          });
          history.push("/login");
        } else {
          setStatus("unavailable");
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      role: "user",
    };
    checkUser(userDetails);
  };
  console.log(status);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Sign Up!
          </Typography>
          <Typography component="h1" variant="subtitle1">
            Free and always will be.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="current-password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {status === "unavailable" ? (
              <h5>Sorry the username/email is taken </h5>
            ) : null}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>

          {/* <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username (required)" />
            <input name="password" placeholder="Password (required)" />
            <input name="email" placeholder="Email (required)" />

            <button>Create New User</button>
          </form>

          {status === "unavailable" ? (
            <h5>Sorry the username/email is taken </h5>
          ) : null} */}
        </Box>
      </Container>
    </>
  );
}

export default NewUser;
