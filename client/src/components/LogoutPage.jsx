import * as React from "react";
//import axios from "axios";
//import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

export default function Logout() {
  // const [status, setStatus] = useState("idle");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setStatus("pending");
  //     await axios.delete(`/api/session`)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  // }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        You have logout
      </Typography>
    </div>
  );
}