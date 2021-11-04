import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Divider } from "@mui/material";
import quote from "./pic/quote.png";

export default function Logout() {
  const [status, setStatus] = useState("idle");
  if (status) {null}

  useEffect(() => {
    const fetchData = async () => {
      setStatus("pending");
      await axios.delete(`/api/session`).then((res) => {
        if (res.data){null}
        setStatus("completed");
      });
    };
    fetchData();
  }, []);

  console.log(status);

  return (

    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "Left",
          }}
        >
          <Typography component="h1" variant="h3">
            Logout Successful!
          </Typography>
          <Box m={1} pt={2}></Box>
          <Divider />
          <Box m={1} pt={2}></Box>
          <Typography component="h1" variant="subtitle1">
            Please come back again soon!
          </Typography>
          <Box m={2} pt={3}></Box>
          <img src={quote} />
          <Box m={2} pt={3}></Box>
          <Grid item xs>
            <Link href="/login" variant="body2">
              {"Back to sign in"}
            </Link>
          </Grid>
        </Box>
      </Container>
    </>

  );
}
