import React from "react";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
export const sessionAtom = atom([]);

function LoginPage() {
  const [session, setSession] = useAtom(sessionAtom);
  const [networkStatus, setNetworkStatus] = useState("pending");
  let history = useHistory();

  const handleLogin = async (loginDetails) => {
    await axios
      .post(`/api/session/`, loginDetails)
      .then((res) => {
        setSession(res.data);
        setNetworkStatus("resolved");
        console.log("Text", res.data);
        if (res.data.loginUser.role === "admin") {
          history.push("/admin/dashboard");
        } else if (res.data.loginUser.role === "user") {
          history.push("/user/dashboard");
        } else if (res.data.loginUser.role === "superuser") {
          history.push("/user/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
        setNetworkStatus("error");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const username = event.target.username.value;
    const password = event.target.password.value;
    handleLogin({ username: username, password: password });
  };

  if (session) {
    null;
  } // empty code to prevent errors on session not being used.

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
            Welcome Back!
          </Typography>
          <Typography component="h1" variant="subtitle1">
            The best library book management system
          </Typography>
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
          <Box
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
              autoComplete="email"
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
            ) : null}
          </Box>
          {/* <div>
              <NavLink to="/user/new">
                <p>Create a new user</p>
              </NavLink>
            </div> */}
        </Box>
      </Container>
    </>
  );
}

export default LoginPage;
