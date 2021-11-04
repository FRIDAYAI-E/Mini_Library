import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";


export default function Logout() {
  const [status, setStatus] = useState("idle");

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

  return (
    <div>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        You have logout {status}
      </Typography>
      <NavLink to={"/"}>
            <p style={{textDecoration: "none",  color: "#0060B6"}}> Home </p>
      </NavLink>
    </div>
  );
}
