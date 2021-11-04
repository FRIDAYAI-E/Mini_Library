import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";


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

  return (
    <div>
      <Typography id="keep-mounted-modal-title" variant="h4" component="h2" sx={{marginTop:30}}>
        You have logged out 
      </Typography>
      <NavLink to={"/"}>
            <p style={{textDecoration: "none",  color: "#aaaaa", fontSize:18}}> back to home </p>
      </NavLink>
    </div>
  );
}
